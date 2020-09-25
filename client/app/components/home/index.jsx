import React, { useState } from 'react';
import {
    Icon,
    IconButton,
    Layout,
    LayoutGrid, LayoutGridCell,
    Typography
} from 'mdc-react';


import { useSelector } from 'shared/hooks/store';
import Calendar from 'shared/components/calendar';

import './index.scss';

export default function HomePage() {
    const account = useSelector(store => store.account);
    const lessons = useSelector(store => store.lessons);

    return (
        <main id="home-page" className="page">
            <LayoutGrid>
                <LayoutGridCell span="12">
                    <LessonCalendar lessons={lessons} />
                </LayoutGridCell>
            </LayoutGrid>
        </main >
    );
}

function LessonCalendar({ lessons }) {
    const [view, setView] = useState('week');

    return (
        <section className="lesson-calendar">
            <Layout row justifyContent="between">
                <Typography element="h2" variant="headline6" noMargin>Календарь занятий</Typography>

                <IconButton
                    on={view === 'week'}
                    onIcon={<Icon>view_week</Icon>}
                    offIcon={<Icon>today</Icon>}
                    onClick={() => setView(view => view === 'week' ? 'month' : 'week')}
                />
            </Layout>

            <Calendar
                view={view}
                events={lessons}
            />
        </section>
    );
}