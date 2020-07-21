import React, { useCallback } from 'react';
import {
    Pivot, PivotItem
} from '@fluentui/react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';

import ClientForm from 'app/components/clients/client-form';
import LessonForm from 'app/components/lessons/lesson-form';

import './index.scss';

export default function TrialLessonForm({ client, lesson, onSubmit }) {
    const [data, setData] = useForm({
        date: moment().format('YYYY-MM-DDTHH:mm'),
        client,
        lesson
    });

    const handleSubmit = useCallback(() => {
        data.date = moment(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');

        onSubmit(data);
    }, [data]);

    return (
        <Form id="trial-lesson-form" onSubmit={handleSubmit}>
            <Pivot>
                <PivotItem headerText="Клиент">
                    <ClientForm
                        client={data.client}
                    />
                </PivotItem>

                <PivotItem headerText="Урок">
                    <LessonForm
                        lesson={data.lesson}
                    />
                </PivotItem>
            </Pivot>
        </Form>
    );
}