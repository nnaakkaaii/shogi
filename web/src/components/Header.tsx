import { Button, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import newGameState from '../states/newGameState';
import { useSetRecoilState } from 'recoil';
import React, { useCallback } from 'react';
import finishGameState from '../states/finishGameState';

const MyAppBar = styled(AppBar)({
    flexGrow: 1,
})
const MyTypography = styled(Typography)({
    flexGrow: 1,
})
const MyButton = styled(Button)({
})

const Header = () => {
    const setNewGame = useSetRecoilState(newGameState);
    const setFinishGame = useSetRecoilState(finishGameState);

    const onClickNewGame = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setNewGame(true);
        },
        [setNewGame]
    );

    const onClickFinishGame = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setFinishGame('投了');
            setNewGame(true);
        },
        [setNewGame, setFinishGame]
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