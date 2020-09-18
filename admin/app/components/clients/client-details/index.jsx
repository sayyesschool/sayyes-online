import React, { useContext } from 'react';
import {
    Card,
    Icon,
    List
} from 'mdc-react';
import moment from 'moment';

import DataContext from 'app/contexts/data';

export default function ClientDetails({ client }) {
    const data = useContext(DataContext);

    return (
        <section className="client-details">
            <Card>
                <Card.Header
                    title="Профиль"
                />

                <Card.Section>
                    <List twoLine>
                        <List.Item
                            graphic={<Icon>person</Icon>}
                            primaryText={client.fullname}
                            secondaryText="ФИО"
                        />

                        <List.Item
                            graphic={<Icon>phone</Icon>}
                            primaryText={client.phone || '[Не указан]'}
                            secondaryText="Телефон"
                            meta={!client.phone && <Icon>warning</Icon>}
                        />

                        <List.Item
                            graphic={<Icon>email</Icon>}
                            primaryText={client.email}
                            secondaryText="Электронная почта"
                        />

                        <List.Item
                            graphic={<Icon>cake</Icon>}
                            primaryText={moment(client.dob).format('DD.MM.YYYY')}
                            secondaryText="Дата рождения"
                        />

                        <List.Item
                            graphic={<Icon>public</Icon>}
                            primaryText={client.timezone ? data.timezones.get(client.timezone) : '[Не указан]'}
                            secondaryText="Часовой пояс"
                            meta={!client.timezone && <Icon>warning</Icon>}
                        />
                    </List>
                </Card.Section>
            </Card>
        </section>
    );
}