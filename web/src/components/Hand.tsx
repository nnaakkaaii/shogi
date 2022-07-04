import Box from "@mui/material/Box"
import { styled } from '@mui/material/styles';
import HandSquare from "./HandSquare";
import { FC, MouseEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { myHandPieceState, yourHandPieceState } from "../states/handPieceState";
import pieceState from "../states/pieceState";

const MyBox = styled(Box)({
    minWidth: '100px',
    maxWidth: '100px',
    minHeight: '350px',
    maxHeight: '350px',
});

interface HandRowProps {
    name: string
}

const MyHandRow: FC<HandRowProps> = ({name}) => {
    const [pieces, setPieces] = useRecoilState(pieceState);
    const [myHandPieces, setMyHandPieces] = useRecoilState(myHandPieceState)

    const onClick: (event: MouseEvent) => void = (event) => {
        let from = -1;
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].isClicked) {
                from = i;
            }
        }
        // piece is already clicked
        if (from !== -1) {
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
        let hand = "";
        for (let k in myHandPieces) {
            if (myHandPieces[k].isClicked) {
                hand = myHandPieces[k].name
            }
        }
        // hand piece is already clicked
        if (hand !== "") {
            setMyHandPieces({
                ...myHandPieces,
                [hand]: {
                    name: hand,
                    count: myHandPieces[hand].count,
                    isClicked: false,
                }
            })
            return
        }
        if (myHandPieces[name].count === 0) {
            return
        }
        setMyHandPieces((prevMyHandPieces) => ({
            ...prevMyHandPieces,
            [name]: {
                name: prevMyHandPieces[name].name,
                count: prevMyHandPieces[name].count,
                isClicked: !prevMyHandPieces[name].isClicked,
            },
        }))
    }

    return (
        <div key={name}>
            <HandSquare
                text={name}
                rotate={false}
                onClick={onClick}
                isClicked={myHandPieces[name].isClicked}
            />
            <HandSquare
                text={myHandPieces[name].count.toString()}
                rotate={false}
                onClick={() => {}}
                isClicked={false}
            />
        </div>
    )
}

const YourHandRow: FC<HandRowProps> = ({name}) => {
    const yourHandPieces = useRecoilValue(yourHandPieceState)

    return (
        <div key={name}>
            <HandSquare
                text={name}
                rotate={false}
                onClick={() => {}}
                isClicked={false}
            />
            <HandSquare
                text={yourHandPieces[name].count.toString()}
                rotate={false}
                onClick={() => {}}
                isClicked={false}
            />
        </div>
    )
}

export const MyHand = () => {
    return (
        <>
            <MyBox >
                <MyHandRow name={'歩'} />
                <MyHandRow name={'香'} />
                <MyHandRow name={'桂'} />
                <MyHandRow name={'銀'} />
                <MyHandRow name={'金'} />
                <MyHandRow name={'角'} />
                <MyHandRow name={'飛'} />
            </MyBox>
        </>
    )
}

export const YourHand = () => {
    return (
        <>
            <MyBox >
                <YourHandRow name={'飛'} />
                <YourHandRow name={'角'} />
                <YourHandRow name={'金'} />
                <YourHandRow name={'銀'} />
                <YourHandRow name={'桂'} />
                <YourHandRow name={'香'} />
                <YourHandRow name={'歩'} />
            </MyBox>
        </>
    ) 
};
