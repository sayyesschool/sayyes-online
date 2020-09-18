import React from 'react';
import {
    Card,
    Chip,
    Icon,
    List
} from 'mdc-react';

import MenuButton from 'app/components/shared/menu-button';

export default function EnrollmentStatus({ enrollment }) {
    const hasDetails = enrollment.type && enrollment.format && enrollment.level && enrollment.goal;
    const hasTrialLesson = enrollment.lessons.find(lesson => lesson.trial);
    const hasTeacher = enrollment.lessons.find(lesson => lesson.trial);
    const hasTrialLessonDate = enrollment.lessons.find(lesson => lesson.trial && lesson.date);

    return (
        <section className="enrollment-status">
            <Card>
                <Card.Header
                    title="Статус"
                    actions={
                        <MenuButton
                            button={
                                <Chip
                                    icon={<Icon>{enrollment.statusIcon}</Icon>}
                                    text={enrollment.statusLabel}
                                    trailingIcon={<Icon>arrow_drop_down</Icon>}
                                />
                            }
                            items={[
                                { key: 'pending', 'data-value': 'pending', text: 'В обработке' },
                                { key: 'active', 'data-value': 'active', text: 'Актвное' },
                                { key: 'postponed', 'data-value': 'postponed', text: 'Отложено' },
                                { key: 'canceled', 'data-value': 'canceled', text: 'Отменено' },
                                { key: 'completed', 'data-value': 'completed', text: 'Завершено' }
                            ]}
                            menuProps={{ top: true, right: true }}
                        />
                    }
                />

                <Card.Section>
                    <List>
                        <List.Item
                            graphic={<Icon>{hasDetails ? 'check_box' : 'check_box_outline_blank'}</Icon>}
                            text="Узнать детали обучения"
                        />

                        <List.Item
                            graphic={<Icon>{hasTrialLesson ? 'check_box' : 'check_box_outline_blank'}</Icon>}
                            text="Создать пробный урок"
                        />

                        <List.Item
                            graphic={<Icon>{hasTeacher ? 'check_box' : 'check_box_outline_blank'}</Icon>}
                            text="Найти преподавателя"
                        />

                        <List.Item
                            graphic={<Icon>{hasTeacher ? 'check_box' : 'check_box_outline_blank'}</Icon>}
                            text="Определить дату пробного урока"
                        />
                    </List>
                </Card.Section>
            </Card>
        </section>
    );
}