import { Button } from '@mui/material';
import React from 'react';
import { lime, grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

export type SquareProps = {
    text: string,
    rotate: boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    isClicked: boolean,
};

const MyButton = styled(Button)({
    boxShadow: 'none',
    color: grey['900'],
    fontWeight: 'bold',
    "@media (min-width:1200px)": {
        maxWidth: '50px',
        maxHeight: '50px',
        minWidth: '50px',
        minHeight: '50px',
        fontSize: '25px',
    },
    "@media (min-width:992px) and (max-width:1200px)": {
        maxWidth: '50px',
        maxHeight: '50px',
        minWidth: '50px',
        minHeight: '50px',
        fontSize: '25px',
    },
    "@media (min-width:768px) and (max-width:992px)": {
        maxWidth: '32px',
        maxHeight: '32px',
        minWidth: '32px',
        minHeight: '32px',
        fontSize: '16px',
    },
    "@media (min-width:576px) and (max-width:768px)": {
        maxWidth: '24px',
        maxHeight: '24px',
        minWidth: '24px',
        minHeight: '24px',
        fontSize: '12px',
    },
    "@media (max-width:576px)": {
        maxWidth: '16px',
        maxHeight: '16px',
        minWidth: '16px',
        minHeight: '16px',
        fontSize: '8px',
    },
    '&:hover': {
        backgroundColor: lime['100'],
    },
})

const HandSquare: React.FC<SquareProps> = (props: SquareProps) => {
    const { text, rotate, onClick, isClicked } = props;

    return (
        <MyButton
            variant={"contained"}
            style={{
                transform: rotate ? 'rotate(180deg)' : 'none',
                backgroundColor: isClicked ? lime['400'] : lime['200'],
            }}
            onClick={onClick}
        >
            {text}
        </MyButton>
    );
};

export default HandSquare;