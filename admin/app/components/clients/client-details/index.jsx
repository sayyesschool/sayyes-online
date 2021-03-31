import React, { useContext } from 'react';
import {
    Card,
    Icon,
    IconButton,
    List,
    Typography
} from 'mdc-react';
import moment from 'moment';

import DataContext from 'app/contexts/data';

import './index.scss';

export default function ClientDetails({ client, onEdit }) {
    const data = useContext(DataContext);

    return (
        <section className="client-details">
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
                            primaryText={client.fullname}
                            secondaryText="ФИО"
                        />

                        <List.Item
                            graphic={<Icon>phone</Icon>}
                            primaryText={client.phone || '[Не указан]'}
                            secondaryText="Телефон"
                            meta={!client.phone && <Icon>warning</Icon>}
                        />

                        {client.altPhone &&
                            <List.Item
                                graphic={<Icon>phone</Icon>}
                                primaryText={client.altPhone}
                                secondaryText="Дополнительный телефон"
                            />
                        }

                        <List.Item
                            graphic={<Icon>email</Icon>}
                            primaryText={client.email || '[Не указана]'}
                            secondaryText="Электронная почта"
                            meta={!client.email && <Icon>warning</Icon>}
                        />

                        <List.Item
                            graphic={<Icon>cake</Icon>}
                            primaryText={client.dob ? moment(client.dob).format('DD.MM.YYYY') : '[Не указана]'}
                            secondaryText="Дата рождения"
                        />

                        <List.Item
                            graphic={<Icon>public</Icon>}
                            primaryText={client.timezone ? data.timezones.get(client.timezone) : '[Не указан]'}
                            secondaryText="Часовой пояс"
                            meta={!client.timezone && <Icon>warning</Icon>}
                        />

                        {client.occupation &&
                            <List.Item
                                graphic={<Icon>work</Icon>}
                                primaryText={client.occupation}
                                secondaryText="Род деятельности"
                            />
                        }

                        {client.interests &&
                            <List.Item
                                graphic={<Icon>golf_course</Icon>}
                                primaryText={client.interests}
                                secondaryText="Интересы"
                            />
                        }
                    </List>

                    {client.note &&
                        <div className="client-note">
                            <Typography type="subtitle2" noMargin>Примечание</Typography>
                            <Typography type="body1" noMargin>{client.note}</Typography>
                        </div>
                    }
                </Card.Section>
            </Card>
        </section>
    );
}