import { MouseEvent, useEffect, useState } from "react";
import { errorSelector, useRecoilState } from "recoil";
import { myHandPieceState, Piece, yourHandPieceState } from "../states/handPieceState";
import moveState from "../states/moveState";
import pieceState, { PieceProps } from "../states/pieceState";
import Square from "./Square";
import unpromote from "../utils/unpromote";
import historyState from "../states/historyState";
import to_csa from "../utils/to_csa";
import { MyDialogProps , MyDialog } from "./Dialog";
import promote from "../utils/promote";
import axios from "axios";
import { API_URL } from "../utils/constant";
import from_csa from "../utils/from_csa";
import newGameState from "../states/newGameState";

type BoardProps = {
};

interface moveProps {
    pieces: PieceProps[],
    from: number,
    to: number,
    text: string,
    setPieces: any,
    setHandPieces: any
}

const movePiece: (props: moveProps) => void = ({pieces, from, to, text, setPieces, setHandPieces}) => {
    // 移動先に駒がある場合、手札に入れる
    if (pieces[to].text !== '') {
        const nm = unpromote(pieces[to].text);
        setHandPieces((prevMyHandPieces: {[name: string]: Piece}) => ({
            ...prevMyHandPieces,
            [nm]: {
                name: nm,
                count: prevMyHandPieces[nm].count + 1,
            },
        }))
    }

    // 移動する
    const elem1 = from < to ? from : to
    const elem2 = from < to ? to : from
    const fromPiece = {
        text: '',
        rotate: false,
        isClicked: false,
    }
    const toPiece = {
        text: text,
        rotate: pieces[from].rotate,
        isClicked: false,
    }
    setPieces([
        ...pieces.slice(0, elem1),
        from < to ? fromPiece : toPiece,
        ...pieces.slice(elem1 + 1, elem2),
        from < to ? toPiece : fromPiece,
        ...pieces.slice(elem2 + 1),
    ])
}

const Board: React.FC<BoardProps> = ({}: BoardProps) => {
    const [pieces, setPieces] = useRecoilState(pieceState)
    const [move, setMoves] = useRecoilState(moveState)
    const [myHandPieces, setMyHandPieces] = useRecoilState(myHandPieceState)
    const [, setYourHandPieces] = useRecoilState(yourHandPieceState)
    const [history, setHistory] = useRecoilState(historyState)
    const [modalConfig, setModalConfig] = useState<MyDialogProps | undefined>()
    const [aiTurn, setAITurn] = useState<boolean>(false)
    const [, setNewGame] = useRecoilState(newGameState)

    const getOnClick = (i: number, j: number, index: number) => {
        return async (event: MouseEvent) => {
            let hand = "";
            for (let k in myHandPieces) {
                if (myHandPieces[k].isClicked) {
                    hand = myHandPieces[k].name
                }
            }
            if (hand !== "") {
                // move from hand
                if ((-1 in move) && (move[-1].includes(index))) {
                    setPieces([
                        ...pieces.slice(0, index),
                        {
                            text: hand,
                            rotate: false,
                            isClicked: false,
                        },
                        ...pieces.slice(index + 1),
                    ])
                    setMyHandPieces((prevMyHandPieces) => ({
                        ...prevMyHandPieces,
                        [hand]: {
                            name: hand,
                            count: prevMyHandPieces[hand].count - 1,
                            isClicked: false,
                        }
                    }))

                    // 記録する
                    setHistory((prevHistory) => ([
                        ...prevHistory,
                        to_csa(-1, 9, i, j, hand)
                    ]))
                    
                    // 移動を無効化
                    setMoves({});
                    setAITurn(true);
                    return
                } else {
                    setMyHandPieces((prevMyHandPieces) => ({
                        ...prevMyHandPieces,
                        [hand]: {
                            name: hand,
                            count: prevMyHandPieces[hand].count,
                            isClicked: false,
                        }
                    }))
                    return
                }
            }
            // 既にクリックされているか
            let from = -1;
            for (let k = 0; k < pieces.length; k++) {
                if (pieces[k].isClicked) {
                    from = k;
                }
            }
            // まだクリックされていない & 移動できる
            if (from === -1 && (index in move) && (move[index].length > 0)) {
                setPieces([
                    ...pieces.slice(0, index),
                    {
                        text: pieces[index].text,
                        rotate: pieces[index].rotate,
                        isClicked: true,
                    },
                    ...pieces.slice(index + 1),
                ])
                return
            }
            // まだクリックされていない & 移動できない
            if (from === -1 && !(index in move)) {
                setPieces([
                    ...pieces.slice(0, index),
                    {
                        text: pieces[index].text,
                        rotate: pieces[index].rotate,
                        isClicked: false,
                    },
                    ...pieces.slice(index + 1),
                ])
                return
            }
            const to = index;
            // 同じマスがもうクリックされている or 移動できない -> キャンセル
            if (from === to || !move[from].includes(to)) {
                setPieces([
                    ...pieces.slice(0, from),
                    {
                        text: pieces[from].text,
                        rotate: pieces[from].rotate,
                        isClicked: false,
                    },
                    ...pieces.slice(from + 1),
                ])
                return
            }
            // 成るか確認
            let fromName = pieces[from].text;
            if ((i < 3 || Math.floor(from / 9) < 3) && ['歩', '香', '桂', '銀', '角', '飛'].includes(fromName)) {
                const ret = await new Promise<string>((resolve) => {
                    setModalConfig({
                        onClose: resolve,
                        title: '成りますか？',
                        message: '選択中の駒を成るか選択してください'
                    })
                })
                setModalConfig(undefined)
                if (ret === 'ok') {
                    fromName = promote(pieces[from].text)
                }
            }

            // 移動する
            movePiece({
                pieces: pieces,
                from: from,
                to: to,
                text: fromName,
                setPieces: setPieces,
                setHandPieces: setMyHandPieces
            });

            // 記録する
            setHistory((prevHistory) => ([
                ...prevHistory,
                to_csa(Math.floor(from / 9), from % 9, i, j, fromName)
            ]))
            
            // 移動を無効化
            setMoves({});
            setAITurn(true);
        }
    }

    useEffect(() => {
        const f = async () => {
            // AIの手を打つ
            if (history.length === 0) {
                return
            } 
            if (!aiTurn) {
                return
            }
            setAITurn(false);
            try {
                const res = await axios.post(API_URL, {
                    moves: history
                }, {headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }});
                const data = res.data;
                
                const [oppFrom, oppTo, oppName, fromHand] = from_csa(data.opponent_move)

                if (!fromHand) {
                    if (pieces[oppFrom].text !== oppName && pieces[oppFrom].text !== unpromote(oppName)) {
                        return
                    }
                    // 移動する
                    movePiece({
                        pieces: pieces,
                        from: oppFrom,
                        to: oppTo,
                        text: oppName,
                        setPieces: setPieces,
                        setHandPieces: setYourHandPieces,
                    })
                } else {
                    if (pieces[oppTo].text !== '') {
                        return
                    }
                    // 手札から消去
                    setYourHandPieces((prevYourHandPieces) => ({
                        ...prevYourHandPieces,
                        [oppName]: {
                            name: oppName,
                            count: prevYourHandPieces[oppName].count - 1,
                            isClicked: false,
                        }
                    }))
                    // 盤面に配置
                    setPieces([
                        ...pieces.slice(0, oppTo),
                        {
                            text: oppName,
                            rotate: true,
                            isClicked: false,
                        },
                        ...pieces.slice(oppTo + 1),
                    ])
                }

                // 記録する
                setHistory((prevHistory) => ([
                    ...prevHistory,
                    data.opponent_move,
                ]))

                let movable: {[name: number]: number[]} = {};
                for (const csa of data.next_moves) {
                    const [_from, _to, _, _fromHand] = from_csa(csa)
                    if (_fromHand) {
                        if (-1 in movable) {
                            movable[-1] = [...movable[-1], _to]
                        } else {
                            movable[-1] = [_to]
                        }
                    } else {
                        if (_from in movable) {
                            movable[_from] = [...movable[_from], _to]
                        } else {
                            movable[_from] = [_to]
                        }
                    }
                }

                setMoves(movable);
            } catch {
                const ret = await new Promise<string>((resolve) => {
                    setModalConfig({
                        onClose: resolve,
                        title: 'ゲーム終了',
                        message: 'ゲーム終了です'
                    })
                })
                setNewGame(true);
                setModalConfig(undefined)
                return
            }
        };
        f();
    }, [history])

    return (
        <>
            {[...Array(9)].map((_, i) => (
                <div key={i}>
                    {[...Array(9)].map((__, j) => {
                        const index = 9 * i + j;
                        return (
                            <Square
                                text={pieces[index].text}
                                rotate={pieces[index].rotate}
                                onClick={getOnClick(i, j, index)}
                                isClicked={pieces[index].isClicked}
                            />
                        );
                    })}
                </div>
            ))}
            {modalConfig && <MyDialog {...modalConfig} />}
        </>
    )
}

export default Board;