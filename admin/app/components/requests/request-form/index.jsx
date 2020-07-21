import React, { useState } from 'react';
import {
    Layout,
    Select,
    TabBar, Tab,
    TextField
} from 'mdc-react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import RadioGroup from 'app/components/shared/radio-group';
import PeopleSelect from 'app/components/shared/people-select';
import ScheduleSelect from 'app/components/shared/schedule-select';
import ComboBox from 'app/components/shared/combo-box';
import timezones from 'shared/../data/timezones';

const defaultData = () => ({
    status: 'new',
    contact: {},
    study: {},
    marketing: {},
    managers: [],
    note: undefined
});

const maskFormat = { '*': /[0-9]/ };

export default function RequestForm({ request = defaultData(), onSubmit }) {
    const [activeTab, setActiveTab] = useState('general');
    const [data, handleChange] = useForm({
        ...request
    });

    function handleSubmit() {
        data.contact.phone = data.contact?.phone.replace(/ /gm, '');
        data.managers = data.managers.map(m => m.id);

        onSubmit(data);
    }

    return (
        <>
            <TabBar value={activeTab} onChange={setActiveTab} minWidth>
                <Tab value="general">Основное</Tab>
                <Tab value="contact">Контакт</Tab>
                <Tab value="study">Обучение</Tab>
                <Tab value="marketing">Маркетинг</Tab>
            </TabBar>

            <Form id="request-form" onSubmit={handleSubmit}>
                <TabPanel shown={activeTab === 'general'}>
                    <Layout column>
                        <Select
                            name="status"
                            value={data.status}
                            label="Статус"
                            options={[
                                { value: 'new', text: 'Новая' },
                                { value: 'pending', text: 'В обработке' },
                                { value: 'resolved', text: 'Успешная' },
                                { value: 'rejected', text: 'Отказ' },
                                { value: 'postponed', text: 'Отложенная' },
                            ]}
                            required
                            onChange={handleChange}
                        />

                        {data.createAt &&
                            <TextField
                                type="datetime-local"
                                name="createdAt"
                                value={moment(data.createdAt).format('YYYY-MM-DDTHH:mm')}
                                label="Дата создания"
                                filled
                                onChange={handleChange}
                            />
                        }

                        {data.client &&
                            <PeopleSelect
                                label="Клиент"
                                defaultSelectedItems={[{
                                    text: data.client.fullname
                                }]}
                            />
                        }

                        <ComboBox
                            name="foo"
                            value="bar"
                            label="Baz"
                            filled
                            required
                            onChange={handleChange}
                        />

                        <PeopleSelect
                            label="Менеджеры"
                            defaultSelectedItems={data.managers.map(manager => ({
                                text: manager.fullname
                            }))}
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

                        <TextField
                            name="note"
                            value={data.note}
                            label="Примечание"
                            filled
                            textarea
                            onChange={handleChange}
                        />
                    </Layout>
                </TabPanel>

                {request.contact &&
                    <TabPanel shown={activeTab === 'contact'}>
                        <Layout column>
                            <TextField
                                name="contact.firstname"
                                value={data.contact.firstname}
                                label="Имя"
                                filled
                                required
                                onChange={handleChange}
                            />

                            <TextField
                                name="contact.lastname"
                                value={data.contact.lastname}
                                label="Фамилия"
                                filled
                                onChange={handleChange}
                            />

                            <TextField
                                name="contact.patronym"
                                value={data.contact.patronym}
                                label="Отчество"
                                filled
                                onChange={handleChange}
                            />

                            <TextField
                                type="phone"
                                name="contact.phone"
                                value={data.contact.phone}
                                label="Телефон"
                                required
                                filled
                                onChange={handleChange}
                            />

                            <TextField
                                type="email"
                                name="contact.email"
                                value={data.contact.email}
                                label="Эл. почта"
                                filled
                                onChange={handleChange}
                            />

                            <TextField
                                type="date"
                                name="contact.dob"
                                value={moment(data.contact.dob).format('YYYY-MM-DD')}
                                label="Дата рождения"
                                filled
                                onChange={handleChange}
                            />

                            <Select
                                name="contact.timezone"
                                value={data.contact.timezone}
                                label="Часовой пояс"
                                options={timezones.map(item => ({
                                    key: item.value,
                                    value: item.value,
                                    text: item.text
                                }))}
                                onChange={handleChange}
                            />

                            <RadioGroup
                                name="contact.gender"
                                value={data.contact.gender}
                                label="Пол"
                                options={[
                                    { value: 'man', label: 'Мужчина' },
                                    { value: 'woman', label: 'Женщина' }
                                ]}
                                onChange={handleChange}
                            />
                        </Layout>
                    </TabPanel>
                }

                <TabPanel shown={activeTab === 'study'}>
                    <Layout column>
                        <Select
                            name="study.age"
                            value={data.study.age}
                            label="Возрастная группа"
                            options={[
                                { value: '', text: '' },
                                { key: 'child', value: 'child', text: 'Дети' },
                                { key: 'teenager', value: 'teenager', text: 'Подростки' },
                                { key: 'adult', value: 'adult', text: 'Взрослые' }
                            ]}
                            onChange={handleChange}
                        />

                        <Select
                            name="study.level"
                            value={data.study.level}
                            label="Уровень"
                            options={[
                                { value: '', text: '' },
                                { key: 'zero', text: 'Нулевой' },
                                { key: 'beg', text: 'Beginner' },
                                { key: 'elem', text: 'Elementary' },
                                { key: 'pre', text: 'Pre-Intermediate' },
                                { key: 'int', text: 'Intermediate' },
                                { key: 'upper', text: 'Upper-Intermediate' },
                                { key: 'adv', text: 'Advanced' }
                            ]}
                            onChange={handleChange}
                        />

                        <Select
                            name="study.goal"
                            value={data.study.goal}
                            label="Цель"
                            options={[
                                { value: '', text: '' },
                                { value: 'work', text: 'Для работы' },
                                { value: 'study', text: 'Для учебы' },
                                { value: 'travel', text: 'Для путешествий' },
                                { value: 'hobby', text: 'Для себя' }
                            ]}
                            onChange={handleChange}
                        />

                        <Select
                            name="study.teacher"
                            value={data.study.goal}
                            label="Преподаватель"
                            options={[
                                { value: '', text: '' },
                                { value: 'russian', text: 'Русскоговорящий' },
                                { value: 'english', text: 'Англоговорящий' }
                            ]}
                            onChange={handleChange}
                        />

                        <ScheduleSelect
                            schedule={data.study.schedule}
                            onChange={handleChange}
                        />
                    </Layout>
                </TabPanel>

                <TabPanel shown={activeTab === 'marketing'}>
                    <Layout column>
                        <Select
                            name="marketing.channel"
                            value={data.channel}
                            label="Канал связи"
                            options={[
                                { value: '', text: '' },
                                { key: 'site', text: 'Сайт' },
                                { key: 'call', text: 'Звонок' },
                                { key: 'whatsapp', text: 'WhatsApp' },
                                { key: 'instagram', text: 'Instagram' },
                            ]}
                            onChange={handleChange}
                        />

                        <Select
                            name="marketing.source"
                            value={data.source}
                            label="Источник"
                            options={[
                                { value: '', text: '' },
                                { key: 'instagram', text: 'Инстаграм' },
                                { key: 'whatsapp', text: 'WhatsApp' },
                                { key: 'yandex', text: 'Яндекс' },
                                { key: 'google', text: 'Google' },
                                { key: 'referral', text: 'Рекомендация' }
                            ]}
                            onChange={handleChange}
                        />
                    </Layout>
                </TabPanel>
            </Form >
        </>
    );
}

function TabPanel({ shown, children }) {
    return shown && children;
}