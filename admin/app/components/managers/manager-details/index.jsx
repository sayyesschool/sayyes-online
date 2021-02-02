import React, { useContext } from 'react';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';
import moment from 'moment';

import DataContext from 'app/contexts/data';

export default function ManagerDetails({ manager, onEdit }) {
    const data = useContext(DataContext);

    return (
        <section className="manager-details">
            <Card>
                <Card.Header
                    title="Профиль"
                    actions={
                        <IconButton
                            icon="edit"
                            onClick={onEdit}
                        />
                    }
                />

                <Card.Section>
                    <List twoLine>
                        <List.Item
                            graphic={<Icon>person</Icon>}
                            primaryText={manager.fullname}
                            secondaryText="ФИО"
                        />

                        <List.Item
                            graphic={<Icon>phone</Icon>}
                            primaryText={manager.phone || '[Не указан]'}
                            secondaryText="Телефон"
                            meta={!manager.phone && <Icon>warning</Icon>}
                        />

                        <List.Item
                            graphic={<Icon>email</Icon>}
                            primaryText={manager.email}
                            secondaryText="Электронная почта"
                        />

                        <List.Item
                            graphic={<Icon>cake</Icon>}
                            primaryText={moment(manager.dob).format('DD.MM.YYYY')}
                            secondaryText="Дата рождения"
                        />

                        <List.Item
                            graphic={<Icon>public</Icon>}
                            primaryText={manager.timezone ? data.timezones.get(manager.timezone) : '[Не указан]'}
                            secondaryText="Часовой пояс"
                            meta={!manager.timezone && <Icon>warning</Icon>}
                        />
                    </List>
                </Card.Section>
            </Card>
        </section>
    );
}