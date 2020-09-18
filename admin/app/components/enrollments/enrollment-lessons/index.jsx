import React from 'react';
import {
    Card,
    IconButton,
    List
} from 'mdc-react';

export default function EnrollmentLessons({ enrollment, onCreate }) {
    return (
        <section className="enrollment-lessons">
            <Card>
                <Card.Header
                    title="Занятия"
                    actions={
                        <IconButton
                            icon="add"
                            onClick={onCreate}
                        />
                    }
                />

                <Card.Section>
                    <List twoLine>
                        {enrollment.lessons.map(lesson =>
                            <List.Item
                                primaryText={lesson.datetime}
                                secondaryText={lesson.trial ? 'Пробный урок' : 'Урок'}
                            />
                        )}
                    </List>
                </Card.Section>
            </Card>
        </section>
    );
}