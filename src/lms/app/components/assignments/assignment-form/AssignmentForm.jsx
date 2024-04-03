import { useCallback } from 'react';

import { statusOptions } from 'shared/data/assignment';
import { useFormData } from 'shared/hooks/form';
import datetime from 'shared/libs/datetime';
import Form from 'shared/ui-components/form';

const getDefaultData = data => ({
    title: '',
    status: 'assigned',
    dueDate: datetime().format('YYYY-MM-DDTHH:mm'),
    ...data
});

export default function AssignmentForm({
    assignment,
    onSubmit,
    ...props
}) {
    const { data, getData, handleChange } = useFormData(getDefaultData(assignment));

    const handleSubmit = useCallback(() => {
        getData(data => {
            onSubmit({
                ...data,
                date: new Date(data.dueDate).toISOString()
            });
        });
    }, [onSubmit]);

    return (
        <Form
            className="AssignmentForm"
            onSubmit={handleSubmit}
            {...props}
        >
            <Form.Input
                label="Заголовок"
                name="title"
                value={data.title}
                onChange={handleChange}
            />

            <Form.Select
                label="Статус"
                name="status"
                value={data.status}
                options={statusOptions}
                required
                onChange={handleChange}
            />

            <Form.Input
                label="Дата выполнения"
                type="date"
                name="dueAt"
                value={datetime(data.dueAt).format('YYYY-MM-DD')}
                required
                onChange={handleChange}
            />
        </Form>
    );
}