import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Card
} from 'mdc-react';

import './index.scss';

export default function EnrollmentCard({ enrollment, ...props }) {
    return (
        <Card className="enrollment-card" outlined {...props}>
            <Card.Header
                title={enrollment.title}
                subtitle={enrollment.schedule}
            />

            <Card.Actions>
                <Card.Action button>
                    <Button component={Link} to={enrollment.url}>Подробнее</Button>
                </Card.Action>

                {enrollment.isActive &&
                    <Card.Action button>
                        <Button element="a" href={`/class/${enrollment.id}`} target="_blank" unelevated>В класс</Button>
                    </Card.Action>
                }
            </Card.Actions>
        </Card>
    );
}