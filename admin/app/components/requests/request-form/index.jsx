import React, { useState, useCallback } from 'react';
import {
    Checkbox,
    ChoiceGroup,
    Label,
    MaskedTextField,
    TextField,
    Pivot, PivotItem,
    Stack
} from '@fluentui/react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import Select from 'app/components/shared/select';
import DatePicker from 'app/components/shared/date-picker';
import PeoplePicker from 'app/components/shared/people-picker';
import TimePicker from 'app/components/shared/time-picker';

const defaultData = () => ({
    status: 'new',
    contact: {},
    study: {
        level: undefined,
        goal: undefined,
        channel: undefined
    },
    marketing: {
        source: undefined,
        category: undefined
    },
    managers: [],
    note: undefined
});

const maskFormat = { '*': /[0-9]/ };

export default function RequestForm({ request = defaultData(), onSubmit }) {
    const [data, handleChange] = useForm({
        status: request.status,
        contact: request.contact,
        study: request.study,
        marketing: request.marketing,
        managers: request.managers,
        createdAt: request.createdAt
    });

    function handleSubmit() {
        data.contact.phone = data.contact?.phone.replace(/ /gm, '');

        onSubmit(data);
    }

    return (
        <Form id="request-form" onSubmit={handleSubmit}>
            <Pivot>
                <PivotItem headerText="Основное">
                    <Stack tokens={{ childrenGap: 8 }}>
                        <Select
                            name="status"
                            label="Статус"
                            options={[
                                { key: 'new', text: 'Новая' },
                                { key: 'pending', text: 'В обработке' },
                                { key: 'resolved', text: 'Успешная' },
                                { key: 'rejected', text: 'Отказ' },
                                { key: 'postponed', text: 'Отложенная' },
                            ]}
                            selectedKey={data.status}
                            onChange={handleChange}
                        />

                        <DatePicker
                            name="createdAt"
                            value={data.createdAt}
                            label="Дата создания"
                            onChange={handleChange}
                        />

                        <PeoplePicker
                            label="Менеджеры"
                            defaultSelectedItems={data.managers.map(manager => ({
                                primaryText: manager.fullname
                            }))}
                        />

                        <TextField
                            name="note"
                            value={data.note}
                            label="Примечание"
                            multiline
                            onChange={handleChange}
                        />
                    </Stack>
                </PivotItem>

                <PivotItem headerText="Контакт">
                    <Stack tokens={{ childrenGap: 8 }}>
                        <TextField
                            name="contact.firstname"
                            value={data.contact.firstname}
                            label="Имя"
                            required
                            onChange={handleChange}
                        />

                        <TextField
                            name="contact.lastname"
                            value={data.contact.lastname}
                            label="Фамилия"
                            required
                            onChange={handleChange}
                        />

                        <TextField
                            name="contact.patronym"
                            value={data.contact.patronym}
                            label="Отчество"
                            required
                            onChange={handleChange}
                        />

                        <MaskedTextField
                            name="contact.phone"
                            value={data.contact.phone}
                            label="Телефон"
                            required
                            mask="* *** *** ** **"
                            maskFormat={maskFormat}
                            onChange={handleChange}
                        />

                        <TextField
                            name="contact.email"
                            value={data.contact.email}
                            label="Эл. почта"
                            type="email"
                            onChange={handleChange}
                        />

                        <ChoiceGroup
                            name="contact.gender"
                            label="Пол"
                            options={[
                                { key: 'male', text: 'Мужчина' },
                                { key: 'female', text: 'Женщина' }
                            ]}
                            onChange={handleChange}
                        />

                        <DatePicker
                            name="contact.dob"
                            value={data.contact.dob}
                            label="Дата рождения"
                            onChange={handleChange}
                        />
                    </Stack>
                </PivotItem>

                <PivotItem headerText="Обучение">
                    <Stack tokens={{ childrenGap: 8 }}>
                        <Select
                            name="level"
                            label="Уровень"
                            options={[
                                { key: 'zero', text: 'Нулевой' },
                                { key: 'beg', text: 'Beginner' },
                                { key: 'elem', text: 'Elementary' },
                                { key: 'pre', text: 'Pre-Intermediate' },
                                { key: 'int', text: 'Intermediate' },
                                { key: 'upper', text: 'Upper-Intermediate' },
                                { key: 'adv', text: 'Advanced' }
                            ]}
                            selectedKey={data.channel}
                            onChange={handleChange}
                        />

                        <Select
                            name="goal"
                            label="Цель"
                            options={[
                                { key: '', text: 'Не известен' },
                                { key: 'site', text: 'Сайт' },
                                { key: 'call', text: 'Звонок' },
                                { key: 'whatsapp', text: 'WhatsApp' },
                                { key: 'instagram', text: 'Instagram' },
                            ]}
                            selectedKey={data.channel}
                            onChange={handleChange}
                        />

                        <Label>Расписание</Label>

                        <Stack tokens={{ childrenGap: 16 }} horizontal>
                            <Checkbox
                                label="Пн"
                                inputProps={{
                                    name: 'days',
                                    value: 0
                                }}
                                onChange={console.log}
                            />

                            <Checkbox
                                label="Вт"
                                inputProps={{
                                    name: 'days',
                                    value: 1
                                }}
                                onChange={console.log}
                            />

                            <Checkbox
                                label="Ср"
                                inputProps={{
                                    name: 'days',
                                    value: 2
                                }}
                                onChange={console.log}
                            />

                            <Checkbox
                                label="Чт"
                                inputProps={{
                                    name: 'days',
                                    value: 3
                                }}
                                onChange={console.log}
                            />

                            <Checkbox
                                label="Пт"
                                inputProps={{
                                    name: 'days',
                                    value: 4
                                }}
                                onChange={console.log}
                            />

                            <Checkbox
                                label="Сб"
                                inputProps={{
                                    name: 'days',
                                    value: 5
                                }}
                                onChange={console.log}
                            />

                            <Checkbox
                                label="Вс"
                                inputProps={{
                                    name: 'days',
                                    value: 6
                                }}
                                onChange={console.log}
                            />
                        </Stack>

                        <Stack horizontal>
                            <TimePicker label="С" />
                            <TimePicker label="До" />
                        </Stack>
                    </Stack>
                </PivotItem>

                <PivotItem headerText="Маркетинг">
                    <Select
                        name="channel"
                        label="Канал связи"
                        options={[
                            { key: '', text: 'Не известен' },
                            { key: 'site', text: 'Сайт' },
                            { key: 'call', text: 'Звонок' },
                            { key: 'whatsapp', text: 'WhatsApp' },
                            { key: 'instagram', text: 'Instagram' },
                        ]}
                        selectedKey={data.channel}
                        onChange={handleChange}
                    />

                    <Select
                        name="source"
                        label="Источник"
                        options={[
                            { key: '', text: 'Не известен' },
                            { key: 'instagram', text: 'Инстаграм' },
                            { key: 'whatsapp', text: 'WhatsApp' },
                            { key: 'yandex', text: 'Яндекс' },
                            { key: 'google', text: 'Google' },
                            { key: 'referral', text: 'Рекомендация' }
                        ]}
                        selectedKey={data.source}
                        onChange={handleChange}
                    />
                </PivotItem>
            </Pivot>
        </Form>
    );
}