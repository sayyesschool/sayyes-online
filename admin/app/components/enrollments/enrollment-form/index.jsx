import React, { useCallback } from 'react';
import {
    FormField,
    Layout,
    Select,
    Switch,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';

import { useStore } from 'app/hooks/store';
import ScheduleSelect from 'app/components/shared/schedule-select';
import PeopleSelect from 'app/components/shared/people-select';

export default function EnrollmentForm({ enrollment = {}, onSubmit }) {
    const [user] = useStore('user');
    const [teachers] = useStore('teachers.list');
    const [managers] = useStore('managers.list');
    const [data, handleChange] = useForm({
        status: 'pending',
        type: '',
        format: '',
        age: '',
        level: '',
        goal: '',
        domain: 'general',
        teacher: '',
        schedules: [],
        note: undefined,
        ...enrollment,
        client: enrollment.client?.id,
        teacher: enrollment.teacher?.id,
        manager: enrollment.manager ? enrollment.manager.id : user.id
    });

    const handleSubmit = useCallback(() => {
        onSubmit(data);
    }, [data, onSubmit]);

    return (
        <Form id="enrollment-form" onSubmit={handleSubmit}>
            <Layout column>
                <Select
                    name="type"
                    value={data.type}
                    label="Тип"
                    options={[
                        { key: 'null', value: '', text: '' },
                        { key: 'individual', value: 'individual', text: 'Индвидуально' },
                        { key: 'group', value: 'group', text: 'Группа' }
                    ]}
                    filled
                    required
                    onChange={handleChange}
                />

                <Select
                    name="format"
                    value={data.format}
                    label="Формат"
                    options={[
                        { key: 'null', value: '', text: '' },
                        { key: 'online', value: 'online', text: 'Онлайн' },
                        { key: 'offline', value: 'offline', text: 'Оффлайн' }
                    ]}
                    filled
                    required
                    onChange={handleChange}
                />

                <Select
                    name="age"
                    value={data.age}
                    label="Возрастная группа"
                    options={[
                        { key: 'null', value: '', text: '' },
                        { key: 'adult', value: 'adult', text: 'Взрослые' },
                        { key: 'teenager', value: 'teenager', text: 'Подростки' },
                        { key: 'child', value: 'child', text: 'Дети' }
                    ]}
                    filled
                    onChange={handleChange}
                />

                <Select
                    name="level"
                    value={data.level}
                    label="Уровень"
                    options={[
                        { key: 'null', value: '', text: '' },
                        { key: 'zero', value: 'zero', text: 'Нулевой' },
                        { key: 'beg', value: 'beg', text: 'Beginner' },
                        { key: 'elem', value: 'elem', text: 'Elementary' },
                        { key: 'pre', value: 'pre', text: 'Pre-Intermediate' },
                        { key: 'int', value: 'int', text: 'Intermediate' },
                        { key: 'upper', value: 'upper', text: 'Upper-Intermediate' },
                        { key: 'adv', value: 'adv', text: 'Advanced' }
                    ]}
                    filled
                    onChange={handleChange}
                />

                <Select
                    name="goal"
                    value={data.goal}
                    label="Цель"
                    options={[
                        { key: 'null', value: '', text: '' },
                        { key: 'work', value: 'work', text: 'Для работы' },
                        { key: 'study', value: 'study', text: 'Для учебы' },
                        { key: 'interview', value: 'interview', text: 'Для собеседования' },
                        { key: 'travel', value: 'travel', text: 'Для путешествий' },
                        { key: 'hobby', value: 'hobby', text: 'Для себя (хобби)' }
                    ]}
                    filled
                    onChange={handleChange}
                />

                <FormField label="Носитель языка">
                    <Switch
                        name="native"
                        checked={data.native}
                        onChange={handleChange}
                    />
                </FormField>

                <ScheduleSelect
                    name="schedules"
                    schedule={data.schedules}
                    onChange={handleChange}
                />

                {data.status === 'postponed' &&
                    <TextField
                        type="datetime-local"
                        name="contactAt"
                        value={moment(data.contactAt).format('YYYY-MM-DDTHH:mm')}
                        label="Дата и время связи"
                        filled
                        required
                        onChange={handleChange}
                    />
                }

                {enrollment.id &&
                    <PeopleSelect
                        name="teacher"
                        value={data.teacher || ''}
                        label="Преподаватель"
                        options={teachers.map(teacher => ({
                            key: teacher.id,
                            value: teacher.id,
                            text: teacher.fullname
                        }))}
                        onChange={handleChange}
                    />
                }

                {enrollment.id &&
                    <PeopleSelect
                        name="manager"
                        value={data.manager}
                        label="Менеджер"
                        options={managers.map(manager => ({
                            key: manager.id,
                            value: manager.id,
                            text: manager.fullname
                        }))}
                        onChange={handleChange}
                    />
                }

                <TextField
                    name="note"
                    value={data.note}
                    label="Примечание"
                    filled
                    textarea
                    onChange={handleChange}
                />
            </Layout>
        </Form >
    );
}