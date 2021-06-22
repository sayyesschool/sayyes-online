import React from 'react';
import {
    Avatar,
    Card,
    List,
    Icon
} from 'mdc-react';

import MenuButton from 'shared/components/menu-button';

import DetailsList from 'shared/components/details-list';

export default function EnrollmentDetails({ enrollment }) {
    return (
        <section className="enrollment-details">
            <Card>
                <Card.Header
                    graphic={
                        <Avatar
                            src={enrollment.teacher.imageUrl}
                            text={enrollment.teacher.initials}
                        />
                    }
                    title={enrollment.teacher.fullname}
                    subtitle="Преподаватель"
                />
            </Card>

            <Card>
                <Card.Header
                    graphic={
                        <Avatar
                            src={enrollment.manager.imageUrl}
                            text={enrollment.manager.initials}
                        />
                    }
                    title={enrollment.manager.fullname}
                    subtitle="Менеджер"
                    actions={
                        <MenuButton
                            items={[
                                { key: 'whatsapp', text: 'Написать в What\'s App', element: 'a', href: `https://wa.me/${enrollment.manager.phone}`, target: '_blank' },
                                { key: 'email', text: 'Написать письмо', element: 'a', href: `mailto:${enrollment.manager.email}`, target: '_blank' },
                                { key: 'email', text: 'Позвонить', element: 'a', href: `tel:${enrollment.manager.phone}`, target: '_blank' }
                            ]}
                        />
                    }
                />
            </Card>

            <Card>
                <Card.Header
                    title="Детали обучения"
                />

                <Card.Section>
                    <DetailsList>
                        <List.Item
                            graphic={<Icon>timelapse</Icon>}
                            primaryText={enrollment.lessonDuration + ' мин.'}
                            secondaryText="Продолжительность урока"
                        />

                        <List.Item
                            graphic={<Icon>signal_cellular_alt</Icon>}
                            primaryText={enrollment.levelLabel || '[Не указан]'}
                            secondaryText="Уровень"
                        />
                    </DetailsList>
                </Card.Section>
            </Card>
        </section>
    );
}