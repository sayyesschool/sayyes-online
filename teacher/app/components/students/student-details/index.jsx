import React, { useContext } from 'react';
import {
    Button,
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';
import moment from 'moment';

import { useBoolean } from 'shared/hooks/state';
import DataContext from 'shared/contexts/data';

export default function StudentDetails({ student, onUpdate }) {
    const data = useContext(DataContext);

    const [isOpen, toggleOpen] = useBoolean(false);

    return (
        <section className="student-details">
            <Card>
                <Card.PrimaryAction onClick={toggleOpen}>
                    <Card.Header
                        graphic={<Icon>contact_page</Icon>}
                        title="Детали студента"
                        actions={
                            <IconButton
                                icon={isOpen ? 'expand_less' : 'expand_more'}
                            />
                        }
                    />
                </Card.PrimaryAction>

                {isOpen &&
                    <Card.Section>
                        <List twoLine>
                            <List.Item
                                graphic={<Icon>phone</Icon>}
                                primaryText={student.phone || '[Не указан]'}
                                secondaryText="Телефон"
                            />

                            <List.Item
                                graphic={<Icon>email</Icon>}
                                primaryText={student.email || '[Не указан]'}
                                secondaryText="Электронная почта"
                            />

                            <List.Item
                                graphic={<Icon>cake</Icon>}
                                primaryText={student.dob ? moment(student.dob).format('DD.MM.YYYY') : '[Не указана]'}
                                secondaryText="Дата рождения"
                            />

                            <List.Item
                                graphic={<Icon>public</Icon>}
                                primaryText={student.timezone ? data.timezones.get(student.timezone) : '[Не указан]'}
                                secondaryText="Часовой пояс"
                            />

                            <List.Item
                                graphic={<Icon>location_city</Icon>}
                                primaryText={student.address || '[Не указан]'}
                                secondaryText="Адрес"
                            />

                            <List.Item
                                graphic={<Icon>work</Icon>}
                                primaryText={student.occupation || '[Не указана]'}
                                secondaryText="Род деятельности"
                            />

                            <List.Item
                                graphic={<Icon>golf_course</Icon>}
                                primaryText={student.interests || '[Не указаны]'}
                                secondaryText="Интересы"
                            />

                            {student.note &&
                                <List.Item
                                    graphic={<Icon>notes</Icon>}
                                    primaryText={student.note}
                                    secondaryText="Интересы"
                                />
                            }
                        </List>
                    </Card.Section>
                }
            </Card>
        </section>
    );
}