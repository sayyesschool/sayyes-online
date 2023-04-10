import { forwardRef, useRef, useImperativeHandle } from 'react';

import { useFormData } from 'shared/hooks/form';
import { Form } from 'shared/ui-components';

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

function ContactForm({ contact = {}, onSubmit, ...props }, ref) {
    const formRef = useRef();

    const { data, handleChange } = useFormData({
        ...defaultContact,
        ...contact
    }, [contact?.id]);

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    return (
        <Form ref={formRef} className="ContactForm" onSubmit={() => onSubmit(data)} {...props}>
            <Form.Input
                type="text"
                name="relation"
                value={data.relation}
                label="Кем приходится"
                onChange={handleChange}
            />

            <Form.Input
                name="firstname"
                value={data.firstname}
                label="Имя"
                required
                onChange={handleChange}
            />

            <Form.Input
                name="lastname"
                value={data.lastname}
                label="Фамилия"
                onChange={handleChange}
            />

            <Form.Input
                name="patronym"
                value={data.patronym}
                label="Отчество"
                onChange={handleChange}
            />

            <Form.Input
                type="phone"
                name="phone"
                value={data.phone}
                label="Телефон"
                required
                onChange={handleChange}
            />

            <Form.Input
                type="phone"
                name="altPhone"
                value={data.altPhone}
                label="Дополнительный телефон"
                onChange={handleChange}
            />

            <Form.Input
                type="email"
                name="email"
                value={data.email}
                label="Электронная почта"
                onChange={handleChange}
            />

            <Form.Input
                type="text"
                name="occupation"
                value={data.occupation}
                label="Род деятельности"
                onChange={handleChange}
            />

            <Form.Textarea
                name="note"
                value={data.note}
                label="Примечание"
                onChange={handleChange}
            />
        </Form>
    );
}

export default forwardRef(ContactForm);