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
            <Card outlined>
                <Card.Header
                    title="Занятия"
                    subtitle={(!enrollment.lessons || enrollment.lessons.length === 0) && 'Занятий пока нет'}
                />

                {enrollment.lessons &&
                    <Card.Section>
                        <List twoLine>
                            {enrollment.lessons?.map(lesson =>
                                <List.Item
                                    key={lesson.id}
                                    graphic={<Icon>{lesson.statusIcon}</Icon>}
                                    primaryText={lesson.datetime}
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