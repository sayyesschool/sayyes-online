import React from 'react';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';

export default function EnrollmentDetails({ enrollment }) {
    return (
        <section className="enrollment-details">
            <Card outlined>
                <Card.Header
                    title="Детали"
                />

                <Card.Section>
                    <List twoLine>
                        <List.Item
                            graphic={<Icon>schedule</Icon>}
                            primaryText={enrollment.schedule || '[Не указано]'}
                            secondaryText="Расписание"
                        />

                        <List.Item
                            graphic={<Icon>person</Icon>}
                            primaryText={enrollment.teacher?.fullname}
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