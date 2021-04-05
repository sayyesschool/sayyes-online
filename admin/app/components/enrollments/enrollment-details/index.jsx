import React from 'react';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';
import moment from 'moment';

import './index.scss';

export default function EnrollmentDetails({ enrollment, onEdit }) {
    return (
        <section className="enrollment-details">
            <Card>
                <Card.Header
                    title="Детали"
                    actions={
                        <IconButton
                            icon="edit"
                            onClick={onEdit}
                        />
                    }
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
                            primaryText={enrollment.purposeLabel || '[Не указана]'}
                            secondaryText="Цель"
                        />

                        <List.Item
                            graphic={<Icon>schedule</Icon>}
                            primaryText={enrollment.trialLesson ? moment(enrollment.trialLesson.date).format('DD.MM.YYYY') : '[Не указано]'}
                            secondaryText="Предполагаемая дата и время пробного урока"
                        />

                        <List.Item
                            graphic={<Icon>schedule</Icon>}
                            primaryText={enrollment.scheduleLabel || '[Не указано]'}
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