import Box from "@mui/material/Box"
import { styled } from '@mui/material/styles';
import HandSquare from "./HandSquare";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { myHandPieceState, yourHandPieceState } from "../states/handPieceState";

const MyBox = styled(Box)({
    minWidth: '100px',
    maxWidth: '100px',
    minHeight: '350px',
    maxHeight: '350px',
});

interface Piece {
    name: string,
    count: number,
}

interface HandRowProps {
    rotate: boolean,
    piece: Piece,
}

const HandRow: FC<HandRowProps> = ({rotate, piece}) => {
    if (rotate) {
        return (
            <div key={piece.name}>
                <HandSquare
                    text={piece.name}
                    rotate={rotate}
                    onClick={() => {}}
                />
                <HandSquare
                    text={piece.count.toString()}
                    rotate={rotate}
                    onClick={() => {}}
                />
            </div>
        )
    } else {
        return (
            <div key={piece.name}>
                <HandSquare
                    text={piece.count.toString()}
                    rotate={rotate}
                    onClick={() => {}}
                />
                <HandSquare
                    text={piece.name}
                    rotate={rotate}
                    onClick={() => {}}
                />
            </div>
        )
    }
}

export const MyHand = () => {
    const pieces = useRecoilValue(myHandPieceState)

    return (
        <>
            <MyBox >
                <HandRow rotate={false} piece={pieces['歩']} />
                <HandRow rotate={false} piece={pieces['香']} />
                <HandRow rotate={false} piece={pieces['桂']} />
                <HandRow rotate={false} piece={pieces['銀']} />
                <HandRow rotate={false} piece={pieces['金']} />
                <HandRow rotate={false} piece={pieces['角']} />
                <HandRow rotate={false} piece={pieces['飛']} />
            </MyBox>
        </>
    )
}

export const YourHand = () => {
    const pieces = useRecoilValue(yourHandPieceState)
    return (
        <>
            <MyBox >
                <HandRow rotate={true} piece={pieces['飛']} />
                <HandRow rotate={true} piece={pieces['角']} />
                <HandRow rotate={true} piece={pieces['金']} />
                <HandRow rotate={true} piece={pieces['銀']} />
                <HandRow rotate={true} piece={pieces['桂']} />
                <HandRow rotate={true} piece={pieces['香']} />
                <HandRow rotate={true} piece={pieces['歩']} />
            </MyBox>
        </>
    ) 
};
