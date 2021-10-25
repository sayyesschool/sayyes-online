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
                <Card.Header
                    title="Общая информация"
                />

                {teacher.imageUrl &&
                    <Card.Media
                        imageUrl={teacher.imageUrl}
                        square
                    />
                }

                <Card.Section>
                    <DetailsList
                        items={[
                            {
                                key: 'phone',
                                graphic: <Icon>phone</Icon>,
                                primaryText: teacher.phone || '[Не указан]',
                                secondaryText: 'Телефон'
                            },
                            {
                                key: 'email',
                                graphic: <Icon>email</Icon>,
                                primaryText: teacher.email || '[Не указана]',
                                secondaryText: 'Электронная почта'
                            },
                            {
                                key: 'dob',
                                graphic: <Icon>cake</Icon>,
                                primaryText: teacher.dob ? moment(teacher.dob).format('DD.MM.YYYY') : '[Не указана]',
                                secondaryText: 'Дата рождения'
                            },
                            {
                                key: 'timezone',
                                graphic: <Icon>public</Icon>,
                                primaryText: teacher.timezone ? data.timezones.get(teacher.timezone) : '[Не указан]',
                                secondaryText: 'Часовой пояс'
                            },
                            teacher.note && {
                                key: 'note',
                                graphic: <Icon>notes</Icon>,
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