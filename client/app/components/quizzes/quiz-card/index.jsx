import { Link } from 'react-router-dom';

import {
    Avatar,
    Button,
    Card, CardHeader, CardSection, CardActions, CardAction,
    Icon,
    Typography
} from '@codedojo/mdc-react';

export default function QuizCard({ quiz, ...props }) {
    return (
        <Card className={`quiz-card topic-card theme-${quiz.topic.id}`} {...props}>
            <CardHeader
                graphic={<Avatar src={`/img/topics/${quiz.topic.id}.svg`} />}
                title={quiz.title}
                action={quiz.isCompleted && <Icon title="Тест пройден">check</Icon>}
            />

            <CardSection primary>
                <Typography type="body2" noMargin>{quiz.description}</Typography>
            </CardSection>

            <CardActions>
                <CardAction button>
                    <Button component={Link} to={quiz.url}>Подробнее</Button>
                </CardAction>
            </CardActions>
        </Card>
    );
}