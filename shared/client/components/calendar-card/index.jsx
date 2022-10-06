import { useState } from 'react';

import Button from 'shared/ui-components/button';
import Flex from 'shared/ui-components/flex';
import Icon from 'shared/ui-components/icon';
import Surface from 'shared/ui-components/surface';
import Calendar from 'shared/components/calendar';

export default function CalendarCard({ title, events, defaultView = 'week' }) {
    const [view, setView] = useState(defaultView);

    return (
        <Surface className="calendar-card">
            <Flex>
                {title}

                <Button.Group
                    buttons={[
                        {
                            icon: <Icon>calendar_view_week</Icon>,
                            title: 'Неделя',
                            selected: view === 'week',
                            onClick: () => setView('week')
                        },
                        {
                            icon: <Icon>calendar_view_month</Icon>,
                            title: 'Месяц',
                            selected: view === 'month',
                            onClick: () => setView('month')
                        }
                    ]}
                />
            </Flex>

            <Calendar
                view={view}
                events={events}
            />
        </Surface>
    );
}