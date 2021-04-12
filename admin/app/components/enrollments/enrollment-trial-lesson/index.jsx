import React, { useState, useCallback } from 'react';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';
import moment from 'moment';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';
import DateTimeSelect from 'shared/components/datetime-select';

import './index.scss';

export default function EnrollmentTrialLesson({ enrollment, onUpdate }) {
    const [items, setItems] = useState(enrollment.trialLesson);

    const [isFormOpen, toggleFormOpen] = useBoolean(false);

    const handleChange = useCallback((event, value) => {
        setItems(value);
    }, []);

    const handleSubmit = useCallback(() => {
        onUpdate({ trialLesson: items })
            .then(() => toggleFormOpen(false));
    }, [items]);

    const hasItems = enrollment.trialLesson.length > 0;

    return (
        <section className="enrollment-trial-lesson">
            <Card>
                <Card.Header
                    title="Пробный урок"
                    subtitle={!hasItems && 'Не запланирован'}
                    actions={
                        <IconButton
                            icon="edit"
                            onClick={toggleFormOpen}
                        />
                    }
                />

                {hasItems &&
                    <Card.Section>
                        <List twoLine>
                            {enrollment.trialLesson.map(trialLesson =>
                                <List.Item
                                    key={trialLesson.id}
                                    graphic={<Icon>event</Icon>}
                                    primaryText={moment(trialLesson.date).format('DD.MM.YYYY')}
                                    secondaryText={`${trialLesson.from} - ${trialLesson.to}`}
                                />
                            )}
                        </List>
                    </Card.Section>
                }
            </Card>

            <FormDialog
                title="Изменение пробного урока"
                open={isFormOpen}
                onClose={toggleFormOpen}
                onSubmit={handleSubmit}
            >
                <DateTimeSelect
                    label="Пробный урок"
                    items={items}
                    onChange={handleChange}
                />
            </FormDialog>
        </section>
    );
}