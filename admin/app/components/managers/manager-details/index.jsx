import { useContext } from 'react';
import {
    Card
} from 'mdc-react';
import moment from 'moment';

import DataContext from 'shared/contexts/data';
import DetailsList from 'shared/components/details-list';

export default function ManagerDetails({ manager }) {
    const data = useContext(DataContext);

    return (
        <section className="manager-details">
            <Card>
                {manager.imageUrl &&
                    <Card.Media
                        imageUrl={manager.imageUrl}
                        square
                    />
                }

                <Card.Header
                    title="Общая информация"
                />

                <Card.Section>
                    <DetailsList
                        items={[
                            {
                                key: 'phone',
                                icon: 'phone',
                                primaryText: manager.phone || '[Не указан]',
                                secondaryText: 'Телефон'
                            },
                            {
                                key: 'email',
                                icon: 'email',
                                primaryText: manager.email || '[Не указана]',
                                secondaryText: 'Электронная почта'
                            },
                            {
                                key: 'dob',
                                icon: 'cake',
                                primaryText: manager.dob ? moment(manager.dob).format('DD.MM.YYYY') : '[Не указана]',
                                secondaryText: 'Дата рождения'
                            },
                            {
                                key: 'timezone',
                                icon: 'public',
                                primaryText: manager.timezone ? data.timezones.get(manager.timezone) : '[Не указан]',
                                secondaryText: 'Часовой пояс'
                            },
                            manager.note && {
                                key: 'note',
                                icon: 'notes',
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