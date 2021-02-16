import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Icon,
    List
} from 'mdc-react';

export default function EnrollmentLessons({ enrollment }) {
    return (
        <div className="enrollment-lessons">
            <Card>
                <Card.Header
                    graphic={<Icon>today</Icon>}
                    title="Предстоящие занятия"
                    subtitle={enrollment.scheduleLabel}
                />

                {enrollment.lessons?.length > 0 &&
                    <Card.Section>
                        <List twoLine>
                            {enrollment.lessons?.map(lesson =>
                                <List.Item
                                    key={lesson.id}
                                    primaryText={lesson.dateLabel}
                                    secondaryText={lesson.statusLabel}
                                />
                            )}
                        </List>
                    </Card.Section>
                }
            </Card>
        </div >
    );
}