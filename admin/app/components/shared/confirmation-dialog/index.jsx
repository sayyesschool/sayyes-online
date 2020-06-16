import React from 'react';
import {
    Button,
    Dialog, DialogTitle, DialogContent, DialogActions
} from 'mdc-react';

export default function ConfirmationDialog({ title, children, onClose, onConfirm, ...props }) {
    return (
        <Dialog onClose={onClose} {...props}>
            <DialogTitle>{title}</DialogTitle>

            {children &&
                <DialogContent>
                    {children}
                </DialogContent>
            }

            <DialogActions>
                <Button type="button" onClick={onClose}>Закрыть</Button>
                <Button type="button" onClick={onConfirm} outlined>Подтвердить</Button>
            </DialogActions>
        </Dialog>
    );
}