import React, { useContext } from 'react';
import {
    Card,
    Icon,
    List
} from 'mdc-react';
import moment from 'moment';

import DataContext from 'app/contexts/data';

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

                <Card.Section>
                    <List twoLine>
                        <List.Item
                            graphic={<Icon>phone</Icon>}
                            primaryText={teacher.phone || '[Не указан]'}
                            secondaryText="Телефон"
                            meta={!teacher.phone && <Icon>warning</Icon>}
                        />

                        <List.Item
                            graphic={<Icon>email</Icon>}
                            primaryText={teacher.email}
                            secondaryText="Электронная почта"
                        />

                        <List.Item
                            graphic={<Icon>cake</Icon>}
                            primaryText={moment(teacher.dob).format('DD.MM.YYYY')}
                            secondaryText="Дата рождения"
                        />

                        <List.Item
                            graphic={<Icon>public</Icon>}
                            primaryText={teacher.timezone ? data.timezones.get(teacher.timezone) : '[Не указан]'}
                            secondaryText="Часовой пояс"
                            meta={!teacher.timezone && <Icon>warning</Icon>}
                        />
                    </List>
                </Card.Section>
            </Card>
        </section>
    );
}