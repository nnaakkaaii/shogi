import { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from '@mui/material'

export type MyDialogProps = {
    onClose: (value: string) => void
    title?: string
    message?: string
}

export const MyDialog: FC<MyDialogProps> = ({onClose, title, message}) => {
    return (
        <Dialog open onClose={() => onClose('close')}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => onClose('ok')}>OK</Button>
            <Button onClick={() => onClose('cancel')} autoFocus>
            Cancel
        </Button>
        </DialogActions>
    </Dialog>
    )
}