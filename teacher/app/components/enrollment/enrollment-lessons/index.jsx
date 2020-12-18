import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';

import FormDialog from 'shared/components/form-dialog';

import AssignmentForm from 'app/components/assignment/assignment-form';
import PostForm from 'app/components/post/post-form';

export default function EnrollmentLessons({ enrollment, onCreate }) {
    const [isFormOpen, setFormOpen] = useState(false);

    const handleSubmit = useCallback(data => {
        onCreate(data);
        setFormOpen(false);
    }, []);

    return (
        <div className="enrollment-lessons">
            <Card outlined>
                <Card.Header
                    title="Предстоящие занятия"
                    subtitle={(!enrollment.lessons || enrollment.lessons.length === 0) && 'Занятий пока нет'}
                    actions={
                        <IconButton
                            icon="add"
                            onClick={onCreate}
                        />
                    }
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