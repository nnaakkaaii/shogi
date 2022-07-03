import { Button } from '@mui/material';
import React from 'react';
import { orange, grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

export type SquareProps = {
    text: string,
    rotate: boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
};

const MyButton = styled(Button)({
    boxShadow: 'none',
    backgroundColor: orange['200'],
    color: grey['900'],
    fontWeight: 'bold',
    fontSize: '30px',
    maxWidth: '60px',
    maxHeight: '60px',
    minWidth: '60px',
    minHeight: '60px',
    '&:hover': {
        backgroundColor: orange['100'],
    }
})

const Square: React.FC<SquareProps> = (props: SquareProps) => {
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

export default Square;