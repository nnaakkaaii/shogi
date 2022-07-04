import { Button, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import newGameState from '../states/newGameState';
import { useRecoilState, useResetRecoilState } from 'recoil';
import React, { useCallback, useEffect } from 'react';
import pieceState from '../states/pieceState';
import { myHandPieceState, yourHandPieceState } from '../states/handPieceState';
import historyState from '../states/historyState';
import moveState from '../states/moveState';

const MyAppBar = styled(AppBar)({
    flexGrow: 1,
})
const MyTypography = styled(Typography)({
    flexGrow: 1,
})
const MyButton = styled(Button)({
})

const Header = () => {
    const [newGame, setNewGame] = useRecoilState(newGameState);
    const resetPieces = useResetRecoilState(pieceState);
    const resetMyHandPieces = useResetRecoilState(myHandPieceState);
    const resetYourHandPieces = useResetRecoilState(yourHandPieceState);
    const resetHistory = useResetRecoilState(historyState);
    const resetMove = useResetRecoilState(moveState);

    useEffect(() => {
        if (newGame) {
            setNewGame(false)
            resetPieces()
            resetMyHandPieces()
            resetYourHandPieces()
            resetHistory()
            resetMove()
        }
    }, [newGame])

    const onClickNewGame = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setNewGame(true);
        },
        [setNewGame]
    );

    const onClickFinishGame = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setNewGame(true);
        },
        [setNewGame]
    )

    return (
        <MyAppBar position={"static"}>
            <Toolbar>
                <MyTypography variant={"h6"}>
                    AI将棋
                </MyTypography>
                <MyButton color={"inherit"} onClick={onClickNewGame}>
                    新規ゲーム
                </MyButton>
                <MyButton color={"inherit"} onClick={onClickFinishGame}>
                    投了
                </MyButton>
            </Toolbar>
        </MyAppBar>
    )
}

export default Header;