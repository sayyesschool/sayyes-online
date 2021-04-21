import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';

const defaultContact = {
    relation: '',
    firstname: '',
    lastname: '',
    patronym: '',
    phone: '',
    email: '',
    occupation: '',
    note: ''
};

export default forwardRef(ContactForm);

function ContactForm({ contact = {}, onSubmit, ...props }, ref) {
    const formRef = useRef();

    const [data, handleChange] = useForm({
        ...defaultContact,
        ...contact
    }, [contact?.id]);

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    return (
        <Form ref={formRef} className="contact-form" onSubmit={() => onSubmit(data)} {...props}>
            <Layout column>
                <TextField
                    type="text"
                    name="relation"
                    value={data.relation}
                    label="Кем приходится"
                    filled
                    onChange={handleChange}
                />

                <TextField
                    name="firstname"
                    value={data.firstname}
                    label="Имя"
                    filled
                    required
                    onChange={handleChange}
                />

                <TextField
                    name="lastname"
                    value={data.lastname}
                    label="Фамилия"
                    filled
                    onChange={handleChange}
                />

                <TextField
                    name="patronym"
                    value={data.patronym}
                    label="Отчество"
                    filled
                    onChange={handleChange}
                />

                <TextField
                    type="phone"
                    name="phone"
                    value={data.phone}
                    label="Телефон"
                    required
                    filled
                    onChange={handleChange}
                />

                <TextField
                    type="phone"
                    name="altPhone"
                    value={data.altPhone}
                    label="Дополнительный телефон"
                    filled
                    onChange={handleChange}
                />

                <TextField
                    type="email"
                    name="email"
                    value={data.email}
                    label="Электронная почта"
                    filled
                    onChange={handleChange}
                />

                <TextField
                    type="text"
                    name="occupation"
                    value={data.occupation}
                    label="Род деятельности"
                    filled
                    onChange={handleChange}
                />

                <TextField
                    name="note"
                    value={data.note}
                    label="Примечание"
                    filled
                    textarea
                    onChange={handleChange}
                />
            </Layout>
        </Form>
    );
}