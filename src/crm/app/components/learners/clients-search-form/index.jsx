import { Form, Icon, Input } from 'shared/ui-components';

export default function ClientsSearchForm() {
    return (
        <Form className="ClientsSearchForm">
            <Input
                start={<Icon name="search" />}
                placeholder="Имя, фамилия, эл. почта"
            />
        </Form>
    );
}