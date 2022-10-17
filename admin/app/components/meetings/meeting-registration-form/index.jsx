import useForm from 'shared/hooks/form';
import Form from 'shared/ui-components/form';

export default function MeetingRegistrationForm({ onSubmit }) {
    const { data, setData } = useForm({
        firstname: '',
        lastname: '',
        email: ''
    });

    return (
        <Form id="meeting-registration-form" onSubmit={() => onSubmit(data)}>
            <Form.Input
                label="Имя"
                name="firstname"
                value={data.firstname}
                required
                onChange={setData}
            />

            <Form.Input
                label="Фамилия"
                name="lastname"
                value={data.lastname}
                required
                onChange={setData}
            />

            <Form.Input
                label="Электронная почта"
                type="email"
                name="email"
                value={data.email}
                required
                onChange={setData}
            />
        </Form>
    );
}