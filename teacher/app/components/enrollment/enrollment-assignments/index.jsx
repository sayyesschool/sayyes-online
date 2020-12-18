import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    IconButton,
    List
} from 'mdc-react';

import FormDialog from 'shared/components/form-dialog';

import AssignmentForm from 'app/components/assignment/assignment-form';

export default function EnrollmentAssignments({ enrollment, onCreate }) {
    const [isFromOpen, setFormOpen] = useState(false);

    const handleSubmit = useCallback(data => {
        setFormOpen(false);
        onCreate(data);
    }, []);

    return (
        <div className="enrollment-assignments">
            <Card outlined>
                <Card.Header
                    title="Домашние задания"
                    subtitle={(!enrollment.assignments || enrollment.assignments.length === 0) && 'Заданий пока нет'}
                    actions={
                        <IconButton
                            icon="add"
                            onClick={() => setFormOpen(true)}
                        />
                    }
                />

                {enrollment.assignments &&
                    <Card.Section>
                        <List twoLine>
                            {enrollment.assignments?.map(assignment =>
                                <List.Item
                                    key={assignment.id}
                                    component={Link}
                                    to={assignment.url}
                                    primaryText={assignment.title}
                                    secondaryText={assignment.dueAt}
                                />
                            )}
                        </List>
                    </Card.Section>
                }
            </Card>

            <FormDialog
                className="assignment-dialog"
                form="assignment-form"
                title="Новое задание"
                open={isFromOpen}
                onClose={() => setFormOpen(false)}
            >
                <AssignmentForm
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </div>
    );
}