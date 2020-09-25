import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Button,
    Card, CardMedia, CardHeader, CardSection, CardActions, CardAction,
    ChipSet, Chip,
    Icon
} from 'mdc-react';

// import './index.scss';

export default function ClassCard({ enrollment }) {
    return (
        <Card className="class-card" outlined>
            <CardHeader
                title={enrollment.title}
            />

            <CardActions>
                <CardAction button>
                    <Button
                        component={Link}
                        to={`/class/${enrollment.id}`}
                        unelevated
                    >
                        Продолжить
                    </Button>
                </CardAction>
            </CardActions>
        </Card>
    );
}