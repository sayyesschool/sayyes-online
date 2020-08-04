import React, { useState } from 'react';
import {
    Button,
    Layout,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField
} from 'mdc-react';

export default function ProfileDialogForm({ profile, onSubmit, onClose, ...props }) {
    const [firstname, setFirstname] = useState(profile.firstname);
    const [lastname, setLastname] = useState(profile.lastname);
    const [email, setEmail] = useState(profile.email);

    function handleSubmit(event) {
        event.preventDefault();

        onSubmit({
            firstname,
            lastname,
            email
        });
    }

    return (
        <Dialog onClose={onClose} {...props}>
            <DialogTitle>Редактирование профиля</DialogTitle>

            <DialogContent>
                <form id="profile-form" onSubmit={handleSubmit}>
                    {/* <input type="file" name="avatar" accept="image/jpeg,image/png,image/jpeg" /> */}
                    <Layout column>
                        <TextField
                            type="text"
                            name="firstname"
                            value={firstname}
                            label="Имя"
                            outlined
                            required
                            onChange={setFirstname}
                        />

                        <TextField
                            type="text"
                            name="lastname"
                            value={lastname}
                            label="Фамилия"
                            outlined
                            required
                            onChange={setLastname}
                        />

                        <TextField
                            type="email"
                            name="email"
                            value={email}
                            label="Электронная почта"
                            outlined
                            required
                            onChange={setEmail}
                        />
                    </Layout>

                    {/* <div>
                        <Typography variant="subtitle2">Аватар</Typography>

                        <Typography variant="caption">
                            <span>Формат: <b>jpg, jpeg, png</b></span>
                            <span>Максимальный размер файла: <b>2Mb</b></span>
                            <span>Рекомендованный размер: <b>200х200 px</b></span>
                        </Typography>
                    </div> */}
                </form>
            </DialogContent>

            <DialogActions>
                <Button type="button" onClick={onClose}>Закрыть</Button>
                <Button type="submit" form="profile-form" outlined>Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
}