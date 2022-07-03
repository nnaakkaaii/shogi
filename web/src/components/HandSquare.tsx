import { Button } from '@mui/material';
import React from 'react';
import { lime, grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

export type SquareProps = {
    text: string,
    rotate: boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
};

const MyButton = styled(Button)({
    boxShadow: 'none',
    backgroundColor: lime['200'],
    color: grey['900'],
    fontWeight: 'bold',
    fontSize: '25px',
    maxWidth: '50px',
    maxHeight: '50px',
    minWidth: '50px',
    minHeight: '50px',
    '&:hover': {
        backgroundColor: lime['100'],
    }
})

const HandSquare: React.FC<SquareProps> = (props: SquareProps) => {
    const { text, rotate, onClick } = props;

    return (
        <MyButton
            variant={"contained"}
            style={{
                transform: rotate ? 'rotate(180deg)' : 'none',
            }}
            onClick={onClick}
        >
            {text}
        </MyButton>
    );
};

export default HandSquare;