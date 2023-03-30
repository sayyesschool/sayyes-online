import { useCallback, useState } from 'react';
import moment from 'moment';

import { useBoolean } from 'shared/hooks/state';
import DateTimeSelect from 'shared/components/datetime-select';
import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';
import { Button, Icon, List } from 'shared/ui-components';

export default function EnrollmentTrialLesson({ enrollment, onUpdate }) {
    const [items, setItems] = useState(enrollment.trialLessonSchedule);

    const [isFormOpen, toggleFormOpen] = useBoolean(false);

    const handleChange = useCallback((event, value) => {
        setItems(value);
    }, []);

    const handleSubmit = useCallback(() => {
        onUpdate({ trialLessonSchedule: items })
            .then(() => toggleFormOpen(false));
    }, [items]);

    const hasItems = enrollment.trialLessonSchedule.length > 0;

    return (
        <PageSection
            className="sy-EnrollmentTrialLesson"
            title="Расписание ВУ"
            actions={[{
                key: 'edit',
                icon: 'edit',
                onClick: toggleFormOpen
            }]}
        >
            {hasItems &&
                <List>
                    {enrollment.trialLessonSchedule.map(item =>
                        <List.Item
                            key={item.id}
                            content={<>
                                <Text type="body2">{moment(item.date).format('DD.MM.YYYY')}</Text>
                                <Text type="body3">{item.from} - {item.to}</Text>
                            </>}
                        />
                    )}
                </List>
            }

            <FormDialog
                title="Расписание вводного урока"
                open={isFormOpen}
                onClose={toggleFormOpen}
                onSubmit={handleSubmit}
            >
                <DateTimeSelect
                    name="trialLessonSchedule"
                    items={items}
                    onChange={handleChange}
                />
            </FormDialog>
        </PageSection>
    );
}