import { useState } from 'react';

import useForm from 'shared/hooks/form';
import { Button, Flex, Form, Input, List, Radio, Text } from 'shared/ui-components/Form';

import { types, packages } from './data';

export default function PaymentForm({ }) {
    const { data, onChange } = useForm({
        type: '',
        package: '',
        amount: ''
    });

    const [activeTab, setActiveTab] = useState('type');

    return (
        <Form id="payment-form">
            {/* <TabBar value={activeTab} onChange={setActiveTab} minWidth>
                <Tab value="type" icon={<Icon>school</Icon>} label="1. Тип обучения" disabled={!data.type} />
                <Tab value="package" icon={<Icon>shopping_basket</Icon>} label="2. Пакет" disabled={!data.type} />
                <Tab value="checkout" icon={<Icon>payment</Icon>} label="3. Оплата" disabled={!data.type || !data.package} />
            </TabBar> */}

            {activeTab === 'type' &&
                <section>
                    <List>
                        <List.Item
                            as='label'
                            media={
                                <Radio
                                    name="type"
                                    value="russian"
                                    checked={data.type === 'russian'}
                                    onChange={onChange}
                                />
                            }
                            content="Обучение с русскоязычным преподавателем"
                            selected={data.type === 'russian'}
                        />

                        <List.Item
                            as='label'
                            media={
                                <Radio
                                    name="type"
                                    value="native"
                                    checked={data.type === 'native'}
                                    onChange={onChange}
                                />
                            }
                            content="Обучение с носителем языка"
                            selected={data.type === 'native'}
                        />

                        <List.Item
                            as='label'
                            media={
                                <Radio
                                    name="type"
                                    value="prep"
                                    checked={data.type === 'prep'}
                                    onChange={onChange}
                                />
                            }
                            content="Подготовка к экзаменам, специальные курсы, бизнес-курс"
                            selected={data.type === 'prep'}
                        />
                    </List>

                    <Button type="button" disabled={!data.type} outlined onClick={() => setActiveTab('package')}>Далее</Button>
                </section>
            }

            {activeTab === 'package' &&
                <section>
                    <Text as="h3" type="headline6">{types[data.type]}</Text>
                    <Text as="p" type="subtitle1">Выберите пакет:</Text>

                    <List>
                        {Object.entries(packages[data.type]).map(([key, value]) =>
                            <List.Item
                                key={key}
                                as='label'
                                media={
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

                    <Flex justifyContent="between" alignItems="center">
                        <Text as="p" type="subtitle1">или введите сумму самостоятельно:</Text>

                        <Input
                            name="amount"
                            value={data.amount}
                            placeholder="Произвольная сумма"
                            onChange={onChange}
                            fluid
                        />
                    </Flex>

                    <Flex>
                        <Button type="button" disabled={!data.package && !data.amount} onClick={() => setActiveTab('checkout')}>Далее</Button>
                    </Flex>
                </section>
            }

            {activeTab === 'checkout' &&
                <section>
                    <Text as="h3" type="headline6">{types[data.type]}</Text>
                    <Text as="p" type="subtitle1">{packages[data.type][data.package]} руб.</Text>

                    <Text type="body1">При нажатии на кнопку <strong>Оплатить</strong> вы будете перенаправлены на сайт платежной системы, где сможете выбрать способ оплаты (Банковские карты, Яндекс.Деньги, Qiwi, Сбербанк, Альфа-Банк, Тинькофф, Apple Pay).</Text>

                    <Text type="body2">Нажимая на кропку <strong>Оплатить</strong> вы принимаете условия <a href="/offer" target="_blank">договора-оферты</a>.</Text>

                    <Button type="submit" disabled={!data.type && (!data.package || !data.amount)}>Оплатить</Button>
                </section>
            }
        </Form>
    );
}