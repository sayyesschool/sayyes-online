import React, { useState } from 'react';
import {
    Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Layout,
    TextField
} from 'mdc-react';

export default function PasswordDialogForm({ onSubmit, onClose, ...props }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        onSubmit({
            currentPassword,
            newPassword
        });
    }

    return (
        <Dialog onClose={onClose} {...props}>
            <DialogTitle>Изменение профиля</DialogTitle>

            <DialogContent>
                <form id="password-form" onSubmit={handleSubmit}>
                    <Layout column>
                        <TextField
                            type="password"
                            name="currentPassword"
                            value={currentPassword}
                            label="Текущий пароль"
                            outlined
                            required
                            onChange={setCurrentPassword}
                        />

                        <TextField
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            label="Новый пароль"
                            outlined
                            required
                            onChange={setNewPassword}
                        />
                    </Layout>
                </form>
            </DialogContent>

            <DialogActions>
                <Button type="button" onClick={onClose}>Закрыть</Button>
                <Button type="submit" form="password-form" outlined>Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
}