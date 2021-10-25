import { useContext } from 'react';
import {
    Card,
    Icon
} from 'mdc-react';
import moment from 'moment';

import DataContext from 'shared/contexts/data';
import DetailsList from 'shared/components/details-list';

export default function ManagerDetails({ manager }) {
    const data = useContext(DataContext);

    return (
        <section className="manager-details">
            <Card>
                <Card.Header
                    title="Общая информация"
                />

                <Card.Section>
                    <DetailsList
                        items={[
                            {
                                key: 'phone',
                                graphic: <Icon>phone</Icon>,
                                primaryText: manager.phone || '[Не указан]',
                                secondaryText: 'Телефон'
                            },
                            {
                                key: 'email',
                                graphic: <Icon>email</Icon>,
                                primaryText: manager.email || '[Не указана]',
                                secondaryText: 'Электронная почта'
                            },
                            {
                                key: 'dob',
                                graphic: <Icon>cake</Icon>,
                                primaryText: manager.dob ? moment(manager.dob).format('DD.MM.YYYY') : '[Не указана]',
                                secondaryText: 'Дата рождения'
                            },
                            {
                                key: 'timezone',
                                graphic: <Icon>public</Icon>,
                                primaryText: manager.timezone ? data.timezones.get(manager.timezone) : '[Не указан]',
                                secondaryText: 'Часовой пояс'
                            },
                            manager.note && {
                                key: 'note',
                                graphic: <Icon>notes</Icon>,
                                primaryText: manager.note,
                                secondaryText: 'Примечание'
                            }
                        ]}
                    />
                </Card.Section>
            </Card>
        </section>
    );
}