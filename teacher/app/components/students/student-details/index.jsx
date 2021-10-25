import { useContext } from 'react';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';
import moment from 'moment';

import { useBoolean } from 'shared/hooks/state';
import DataContext from 'shared/contexts/data';
import DetailsList from 'shared/components/details-list';

export default function StudentDetails({ student, onUpdate }) {
    const data = useContext(DataContext);

    const [isOpen, toggleOpen] = useBoolean(false);

    return (
        <section className="student-details">
            <Card>
                <Card.PrimaryAction onClick={toggleOpen}>
                    <Card.Header
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
                        <DetailsList>
                            <List.Item
                                icon="phone"
                                primaryText={student.phone || '[Не указан]'}
                                secondaryText="Телефон"
                            />

                            <List.Item
                                icon="email"
                                primaryText={student.email || '[Не указан]'}
                                secondaryText="Электронная почта"
                            />

                            <List.Item
                                icon="cake"
                                primaryText={student.dob ? moment(student.dob).format('DD.MM.YYYY') : '[Не указана]'}
                                secondaryText="Дата рождения"
                            />

                            <List.Item
                                icon="public"
                                primaryText={student.timezone ? data.timezones.get(student.timezone) : '[Не указан]'}
                                secondaryText="Часовой пояс"
                            />

                            <List.Item
                                icon="location_city"
                                primaryText={student.address || '[Не указан]'}
                                secondaryText="Адрес"
                            />

                            <List.Item
                                icon="work"
                                primaryText={student.occupation || '[Не указана]'}
                                secondaryText="Род деятельности"
                            />

                            <List.Item
                                icon="golf_course"
                                primaryText={student.interests || '[Не указаны]'}
                                secondaryText="Интересы"
                            />

                            {student.note &&
                                <List.Item
                                    icon="notes"
                                    primaryText={student.note}
                                    secondaryText="Заметки"
                                />
                            }
                        </DetailsList>
                    </Card.Section>
                }
            </Card>
        </section>
    );
}