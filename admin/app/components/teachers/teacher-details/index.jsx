import { useContext } from 'react';
import {
    Card,
    Icon,
} from 'mdc-react';
import moment from 'moment';

import DataContext from 'shared/contexts/data';
import DetailsList from 'shared/components/details-list';

export default function TeacherDetails({ teacher }) {
    const data = useContext(DataContext);

    return (
        <section className="teacher-details">
            <Card>
                {teacher.imageUrl &&
                    <Card.Media
                        imageUrl={teacher.imageUrl}
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
                                primaryText: teacher.phone || '[Не указан]',
                                secondaryText: 'Телефон'
                            },
                            {
                                key: 'email',
                                icon: 'email',
                                primaryText: teacher.email || '[Не указана]',
                                secondaryText: 'Электронная почта'
                            },
                            {
                                key: 'dob',
                                icon: 'cake',
                                primaryText: teacher.dob ? moment(teacher.dob).format('DD.MM.YYYY') : '[Не указана]',
                                secondaryText: 'Дата рождения'
                            },
                            {
                                key: 'timezone',
                                icon: 'public',
                                primaryText: teacher.timezone ? data.timezones.get(teacher.timezone) : '[Не указан]',
                                secondaryText: 'Часовой пояс'
                            },
                            teacher.note && {
                                key: 'note',
                                icon: 'notes',
                                primaryText: teacher.note,
                                secondaryText: 'Примечание'
                            }
                        ]}
                    />
                </Card.Section>
            </Card>
        </section>
    );
}