import React, { useContext } from 'react';
import {
    Card,
    Icon
} from 'mdc-react';
import moment from 'moment';

import DataContext from 'app/contexts/data';
import DetailsList from 'app/components/shared/details-list';

import './index.scss';

export default function ClientDetails({ client }) {
    const data = useContext(DataContext);

    return (
        <section className="client-details">
            <Card>
                <Card.Header
                    graphic={<Icon>account_box</Icon>}
                    title="Основные данные"
                />

                <Card.Section>
                    <DetailsList
                        items={[
                            {
                                key: 'phone',
                                graphic: <Icon>phone</Icon>,
                                primaryText: client.phone || '[Не указан]',
                                secondaryText: 'Телефон'
                            },
                            client.altPhone && {
                                key: 'altPhone',
                                graphic: <Icon>phone</Icon>,
                                primaryText: client.altPhone,
                                secondaryText: 'Дополнительный телефон',
                            },
                            {
                                key: 'email',
                                graphic: <Icon>email</Icon>,
                                primaryText: client.email || '[Не указана]',
                                secondaryText: 'Электронная почта'
                            },
                            {
                                key: 'dob',
                                graphic: <Icon>cake</Icon>,
                                primaryText: client.dob ? moment(client.dob).format('DD.MM.YYYY') : '[Не указана]',
                                secondaryText: 'Дата рождения'
                            },
                            {
                                key: 'timezone',
                                graphic: <Icon>public</Icon>,
                                primaryText: client.timezone ? data.timezones.get(client.timezone) : '[Не указан]',
                                secondaryText: 'Часовой пояс'
                            },
                            client.address && {
                                key: 'address',
                                graphic: <Icon>location_city</Icon>,
                                primaryText: client.address,
                                secondaryText: 'Адрес'
                            },
                            client.occupation && {
                                key: 'occupation',
                                graphic: <Icon>work</Icon>,
                                primaryText: client.occupation,
                                secondaryText: 'Род деятельности'
                            },
                            client.interests && {
                                key: 'interests',
                                graphic: <Icon>golf_course</Icon>,
                                primaryText: client.interests,
                                secondaryText: 'Интересы'
                            },
                            client.note && {
                                key: 'note',
                                graphic: <Icon>notes</Icon>,
                                primaryText: client.note,
                                secondaryText: 'Примечание'
                            }
                        ]}
                    />
                </Card.Section>
            </Card>
        </section>
    );
}