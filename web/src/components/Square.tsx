import { Button } from '@mui/material';
import React from 'react';
import { orange, grey } from '@mui/material/colors';
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
    padding: 0,
    "@media (min-width:1200px)": {
        maxWidth: '60px',
        maxHeight: '60px',
        minWidth: '60px',
        minHeight: '60px',
        fontSize: '30px',
    },
    "@media (min-width:992px) and (max-width:1200px)": {
        maxWidth: '60px',
        maxHeight: '60px',
        minWidth: '60px',
        minHeight: '60px',
        fontSize: '30px',
    },
    "@media (min-width:768px) and (max-width:992px)": {
        maxWidth: '40px',
        maxHeight: '40px',
        minWidth: '40px',
        minHeight: '40px',
        fontSize: '20px',
    },
    "@media (min-width:490px) and (max-width:768px)": {
        maxWidth: '36px',
        maxHeight: '36px',
        minWidth: '36px',
        minHeight: '36px',
        fontSize: '18px',
    },
    "@media (min-width:400px) and (max-width:490px)": {
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px',
        fontSize: '15px',
    },
    "@media (max-width:400px)": {
        maxWidth: '26px',
        maxHeight: '28px',
        minWidth: '26px',
        minHeight: '28px',
        fontSize: '14px',
    },
    '&:hover': {
        backgroundColor: orange['100'],
    }
})

const Square: React.FC<SquareProps> = (props: SquareProps) => {
    const { text, rotate, onClick, isClicked } = props;

    return (
        <MyButton
            variant={"contained"}
            style={{
                transform: rotate ? 'rotate(180deg)' : 'none',
                backgroundColor: isClicked ? orange['300']: orange['200'],
            }}
            onClick={onClick}
        >
            {text}
        </MyButton>
    );
};

export default Square;