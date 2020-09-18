import React from 'react';
import {
    Card,
    Icon,
    List
} from 'mdc-react';

import './index.scss';

export default function EnrollmentDetails({ enrollment }) {

    return (
        <section className="enrollment-details">
            <Card>
                <Card.Header
                    title="Детали"
                />

                <Card.Section>
                    <List twoLine>
                        <List.Item
                            graphic={<Icon>portrait</Icon>}
                            primaryText={enrollment.ageLabel || '[Не указана]'}
                            secondaryText="Возрастная группа"
                        />

                        <List.Item
                            graphic={<Icon>grade</Icon>}
                            primaryText={enrollment.levelLabel || '[Не указан]'}
                            secondaryText="Уровень"
                        />

                        <List.Item
                            graphic={<Icon>flag</Icon>}
                            primaryText={enrollment.goal || '[Не указана]'}
                            secondaryText="Цель"
                        />

                        <List.Item
                            graphic={<Icon>schedule</Icon>}
                            primaryText={enrollment.schedule.map(s => s.label).join(', ') || '[Не указано]'}
                            secondaryText="Расписание"
                        />

                        <List.Item
                            graphic={<Icon>person</Icon>}
                            primaryText={enrollment.teacher?.fullname || '[Не указан]'}
                            secondaryText="Преподаватель"
                        />

                        <List.Item
                            graphic={<Icon>person</Icon>}
                            primaryText={enrollment.manager?.fullname}
                            secondaryText="Менеджер"
                        />
                    </List>
                </Card.Section>
            </Card>
        </section>
    );
}