import { useCallback } from 'react';

import { useFormData } from 'shared/hooks/form';
import Form from 'shared/ui-components/form';
import datetime from 'shared/libs/datetime';
import { statusOptions } from 'shared/data/assignment';

const getDefaultData = data => ({
    title: '',
    status: 'scheduled',
    dueAt: datetime().format('YYYY-MM-DDTHH:mm'),
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
                date: new Date(data.dueAt).toISOString()
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