import { useContext } from 'react';
import {
    Card,
    Icon
} from 'mdc-react';
import moment from 'moment';

import DataContext from 'shared/contexts/data';
import DetailsList from 'shared/components/details-list';

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
                                icon: 'phone',
                                primaryText: client.phone || '[Не указан]',
                                secondaryText: 'Телефон'
                            },
                            client.altPhone && {
                                key: 'altPhone',
                                icon: 'phone',
                                primaryText: client.altPhone,
                                secondaryText: 'Дополнительный телефон',
                            },
                            {
                                key: 'email',
                                icon: 'email',
                                primaryText: client.email || '[Не указана]',
                                secondaryText: 'Электронная почта'
                            },
                            {
                                key: 'dob',
                                icon: 'cake',
                                primaryText: client.dob ? moment(client.dob).format('DD.MM.YYYY') : '[Не указана]',
                                secondaryText: 'Дата рождения'
                            },
                            client.address && {
                                key: 'address',
                                icon: 'location_city',
                                primaryText: client.address,
                                secondaryText: 'Адрес'
                            },
                            {
                                key: 'timezone',
                                icon: 'public',
                                primaryText: client.timezone ? data.timezones.get(client.timezone) : '[Не указан]',
                                secondaryText: 'Часовой пояс'
                            },
                            client.occupation && {
                                key: 'occupation',
                                icon: 'work',
                                primaryText: client.occupation,
                                secondaryText: 'Род деятельности'
                            },
                            client.interests && {
                                key: 'interests',
                                icon: 'golf_course',
                                primaryText: client.interests,
                                secondaryText: 'Интересы'
                            },
                            client.note && {
                                key: 'note',
                                icon: 'notes',
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