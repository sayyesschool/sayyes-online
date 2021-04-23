import React, { useCallback } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';

import './index.scss';

export default function LessonsForm({ onSubmit, ...props }) {
    const [data, handleChange] = useForm({
        quantity: 0,
        startDate: new Date()
    });

    const handleSubmit = useCallback(() => {
        onSubmit(data);
    }, [data]);

    return (
        <Form className="lessons-form" onSubmit={handleSubmit} {...props}>
            <Layout column>
                <TextField
                    type="number"
                    name="quantity"
                    value={data.quantity}
                    label="Количество"
                    filled
                    onChange={handleChange}
                />

                <TextField
                    type="date"
                    name="startDate"
                    value={moment(data.startDate).format('YYYY-MM-DD')}
                    label="Начальная дата"
                    filled
                    onChange={handleChange}
                />
            </Layout>
        </Form>
    );
}