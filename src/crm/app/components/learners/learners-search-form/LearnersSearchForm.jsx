import { Form, Icon, Input } from 'shared/ui-components';

export default function LearnersSearchForm() {
    return (
        <Form className="LearnersSearchForm">
            <Input
                start={<Icon name="search" />}
                placeholder="Имя, фамилия, эл. почта"
            />
        </Form>
    );
}