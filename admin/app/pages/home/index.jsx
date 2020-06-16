import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Card, CardHeader, CardSection,
    List, ListItem, ListItemText,
    LayoutGrid, LayoutGridCell,
    Typography
} from 'mdc-react';

import { useStore } from 'shared/hooks/store';

import { actions as lessonActions } from 'app/store/modules/lessons';

import './index.scss';

export default function HomePage() {
    const [state, actions] = useStore(
        state => state.lessons.list,
        lessonActions
    );

    useEffect(() => {
        if (state.length === 0) {
            actions.getLessons();
        }
    }, []);

    const startedMeetings = state.filter(lesson => lesson.status === 'started');
    const scheduledMeetings = state.filter(lesson => lesson.status === 'scheduled');

    return (
        <main id="home-page" className="page">
            <Typography element="h1" variant="headline4">Главная</Typography>

            <LayoutGrid>
                {startedMeetings.length > 0 &&
                    <LayoutGridCell span="4">
                        <Card outlined>
                            <CardHeader title="Начатые уроки" />

                            <CardSection>
                                <List twoLine>
                                    {startedMeetings.map(lesson =>
                                        <ListItem
                                            key={lesson.id}
                                            element={Link}
                                            to={lesson.url}
                                        >
                                            <ListItemText
                                                primary={lesson.title}
                                                secondary={lesson.datetime}
                                            />
                                        </ListItem>
                                    )}
                                </List>
                            </CardSection>
                        </Card>
                    </LayoutGridCell>
                }

                <LayoutGridCell span="4">
                    <Card outlined>
                        <CardHeader title="Предстоящие уроки" />

                        <CardSection>
                            <List twoLine>
                                {scheduledMeetings.map(lesson =>
                                    <ListItem
                                        key={lesson.id}
                                        element={Link}
                                        to={lesson.url}
                                    >
                                        <ListItemText
                                            primary={lesson.title}
                                            secondary={lesson.datetime}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </CardSection>
                    </Card>
                </LayoutGridCell>
            </LayoutGrid>
        </main>
    );
}