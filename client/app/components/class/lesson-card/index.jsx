import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Button,
    Card, CardMedia, CardHeader, CardSection, CardActions, CardAction,
    ChipSet, Chip,
    Icon
} from 'mdc-react';

import './index.scss';

export default function LessonCard({ lesson }) {
    return (
        <Card className="lesson-card" outlined>
            <CardHeader
                title={lesson.title || 'Урок'}
                subtitle={lesson.datetime}
            />

            <CardActions>
                <CardAction button>
                    <Button
                        component={Link}
                        to={lesson.url}
                        unelevated
                    >
                        Подключиться
                    </Button>
                </CardAction>
            </CardActions>
        </Card>
    );
}