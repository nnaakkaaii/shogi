import { MouseEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { myHandPieceState, Piece } from "../states/handPieceState";
import moveState from "../states/moveState";
import pieceState from "../states/pieceState";
import Square from "./Square";
import unpromote from "../utils/unpromote";
import historyState from "../states/historyState";
import to_csa from "../utils/to_csa";
import { MyDialogProps , MyDialog } from "./Dialog";
import promote from "../utils/promote";

type BoardProps = {
};

const Board: React.FC<BoardProps> = ({}: BoardProps) => {
    const [pieces, setPieces] = useRecoilState(pieceState)
    const [move, setMoves] = useRecoilState(moveState)
    const [myHandPieces, setMyHandPieces] = useRecoilState(myHandPieceState)
    const [history, setHistory] = useRecoilState(historyState)
    const [modalConfig, setModalConfig] = useState<MyDialogProps | undefined>()

    const getOnClick = (i: number, j: number, index: number) => {
        return async (event: MouseEvent) => {
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
            // 移動先に駒がある場合、手札に入れる
            if (pieces[to].text !== '') {
                const nm = unpromote(pieces[to].text);
                setMyHandPieces((prevMyHandPieces: {[name: string]: Piece}) => ({
                    ...prevMyHandPieces,
                    [nm]: {
                        name: nm,
                        count: prevMyHandPieces[nm].count + 1,
                    },
                }))
            }

            // 成るか確認
            let fromName = pieces[from].text;
            if (i < 3 && ['歩', '香', '桂', '銀', '角', '飛'].includes(fromName)) {
                const ret = await new Promise<string>((resolve) => {
                    setModalConfig({
                        onClose: resolve,
                        title: '成りますか？',
                        message: '選択中の駒を成るか選択してください'
                    })
                })
                setModalConfig(undefined)
                console.log(ret)
                if (ret === 'ok') {
                    fromName = promote(pieces[from].text)
                }
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
                text: fromName,
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

            // 記録する
            setHistory([
                ...history,
                to_csa(Math.floor(from / 9), from % 9, i, j, fromName)
            ])

            // AIの手を打つ
            
        }
    }

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