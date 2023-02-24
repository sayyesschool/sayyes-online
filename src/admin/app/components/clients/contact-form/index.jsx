import { forwardRef, useRef, useImperativeHandle } from 'react';

import useForm from 'shared/hooks/form';
import Form from 'shared/ui-components/form';

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

    const { data, handleChange } = useForm({
        ...defaultContact,
        ...contact
    }, [contact?.id]);

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    return (
        <Form ref={formRef} className="contact-form" onSubmit={() => onSubmit(data)} {...props}>
            <Form.Input
                type="text"
                name="relation"
                value={data.relation}
                label="Кем приходится"
                fluid
                onChange={handleChange}
            />

            <Form.Input
                name="firstname"
                value={data.firstname}
                label="Имя"
                fluid
                required
                onChange={handleChange}
            />

            <Form.Input
                name="lastname"
                value={data.lastname}
                label="Фамилия"
                fluid
                onChange={handleChange}
            />

            <Form.Input
                name="patronym"
                value={data.patronym}
                label="Отчество"
                fluid
                onChange={handleChange}
            />

            <Form.Input
                type="phone"
                name="phone"
                value={data.phone}
                label="Телефон"
                required
                fluid
                onChange={handleChange}
            />

            <Form.Input
                type="phone"
                name="altPhone"
                value={data.altPhone}
                label="Дополнительный телефон"
                fluid
                onChange={handleChange}
            />

            <Form.Input
                type="email"
                name="email"
                value={data.email}
                label="Электронная почта"
                fluid
                onChange={handleChange}
            />

            <Form.Input
                type="text"
                name="occupation"
                value={data.occupation}
                label="Род деятельности"
                fluid
                onChange={handleChange}
            />

            <Form.Textarea
                name="note"
                value={data.note}
                label="Примечание"
                fluid
                onChange={handleChange}
            />
        </Form>
    );
}