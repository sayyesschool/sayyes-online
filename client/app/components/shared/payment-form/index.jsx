import React, { useState } from 'react';
import {
    Button,
    Icon,
    Layout,
    List,
    Radio,
    TabBar, Tab,
    TextField,
    Typography
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/Form';

import { types, packages } from './data';

export default function PaymentForm({ }) {
    const [activeTab, setActiveTab] = useState('type');
    const [data, onChange] = useForm({
        type: '',
        package: '',
        amount: ''
    });

    return (
        <Form id="payment-form">
            <TabBar value={activeTab} onChange={setActiveTab} minWidth>
                <Tab value="type" icon={<Icon>school</Icon>} label="1. Тип обучения" disabled={!data.type} />
                <Tab value="package" icon={<Icon>shopping_basket</Icon>} label="2. Пакет" disabled={!data.type} />
                <Tab value="checkout" icon={<Icon>payment</Icon>} label="3. Оплата" disabled={!data.type || !data.package} />
            </TabBar>

            {activeTab === 'type' &&
                <section>
                    <List>
                        <List.Item
                            element='label'
                            graphic={
                                <Radio
                                    name="type"
                                    value="russian"
                                    checked={data.type === 'russian'}
                                    onChange={onChange}
                                />
                            }
                            text="Обучение с русскоязычным преподавателем"
                            selected={data.type === 'russian'}
                        />

                        <List.Item
                            element='label'
                            graphic={
                                <Radio
                                    name="type"
                                    value="native"
                                    checked={data.type === 'native'}
                                    onChange={onChange}
                                />
                            }
                            text="Обучение с носителем языка"
                            selected={data.type === 'native'}
                        />

                        <List.Item
                            element='label'
                            graphic={
                                <Radio
                                    name="type"
                                    value="prep"
                                    checked={data.type === 'prep'}
                                    onChange={onChange}
                                />
                            }
                            text="Подготовка к экзаменам, специальные курсы, бизнес-курс"
                            selected={data.type === 'prep'}
                        />
                    </List>

                    <Button type="button" disabled={!data.type} outlined onClick={() => setActiveTab('package')}>Далее</Button>
                </section>
            }

            {activeTab === 'package' &&
                <section>
                    <Typography element="h3" type="headline6" noMargin>{types[data.type]}</Typography>
                    <Typography element="p" type="subtitle1">Выберите пакет:</Typography>

                    <List>
                        {Object.entries(packages[data.type]).map(([key, value]) =>
                            <List.Item
                                key={key}
                                element='label'
                                graphic={
                                    <Radio
                                        name="package"
                                        value={key}
                                        checked={key === data.package}
                                        onChange={onChange}
                                    />
                                }
                                text={`${key} ур.`}
                                meta={`${value} руб.`}
                                selected={key === data.package}
                            />
                        )}
                    </List>

                    <Layout row justifyContent="between" alignItems="center">
                        <Typography element="p" type="subtitle1" noMargin>или введите сумму самостоятельно:</Typography>

                        <TextField
                            name="amount"
                            value={data.amount}
                            placeholder="Произвольная сумма"
                            onChange={onChange}
                            filled
                        />
                    </Layout>

                    <Layout>
                        <Button type="button" disabled={!data.package && !data.amount} outlined onClick={() => setActiveTab('checkout')}>Далее</Button>
                    </Layout>
                </section>
            }

            {activeTab === 'checkout' &&
                <section>
                    <Typography element="h3" type="headline6" noMargin>{types[data.type]}</Typography>
                    <Typography element="p" type="subtitle1">{packages[data.type][data.package]} руб.</Typography>

                    <Typography type="body1">При нажатии на кнопку <strong>Оплатить</strong> вы будете перенаправлены на сайт платежной системы, где сможете выбрать способ оплаты (Банковские карты, Яндекс.Деньги, Qiwi, Сбербанк, Альфа-Банк, Тинькофф, Apple Pay).</Typography>

                    <Typography type="body2">Нажимая на кропку <strong>Оплатить</strong> вы принимаете условия <a href="/offer" target="_blank">договора-оферты</a>.</Typography>

                    <Button type="submit" disabled={!data.type && (!data.package || !data.amount)} unelevated>Оплатить</Button>
                </section>
            }
        </Form>
    );
}