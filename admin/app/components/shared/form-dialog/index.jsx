import React from 'react';
import {
    Button,
    Dialog, DialogTitle, DialogContent, DialogActions
} from 'mdc-react';

export default function FormDialog({ title, form, children, onClose, ...props }) {
    return (
        <Dialog onClose={onClose} {...props}>
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                {children}
            </DialogContent>

            <DialogActions>
                <Button type="button" onClick={onClose}>Закрыть</Button>
                <Button type="submit" form={form} outlined>Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
}