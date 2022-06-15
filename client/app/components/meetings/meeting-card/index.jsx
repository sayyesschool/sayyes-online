import { Link } from 'react-router-dom';
import {
    Avatar,
    Button,
    Card,
    ChipSet, Chip,
    Icon
} from 'mdc-react';

import './index.scss';

export default function MeetingCard({ meeting, onRegister }) {
    return (
        <Card className="meeting-card" outlined>
            {meeting.isPending &&
                <Card.Header
                    title="Заявка обрабатывается"
                    graphic={<Icon>hourglass_empty</Icon>}
                />
            }

            <Card.Media
                imageUrl={STATIC_URL + meeting.imageUrl}
                wide
            />

            <Card.Header
                title={meeting.title}
                subtitle={meeting.datetime}
            />

            <Card.Section secondary>
                <ChipSet>
                    <Chip
                        className={`meeting-level meeting-level--${meeting.level.toLowerCase()}`}
                        leadingIcon={<Icon>star</Icon>}
                        text={meeting.level}
                    />

                    {meeting.host &&
                        <Chip
                            className="meeting-host"
                            leadingIcon={meeting.host.avatarUrl ? <Avatar src={meeting.host.avatarUrl} /> : <Icon>person</Icon>}
                            text={meeting.host.fullname}
                        />
                    }
                </ChipSet>
            </Card.Section>

            <Card.Actions>
                <Card.Action button>
                    <Button
                        component={Link}
                        to={meeting.url}
                        label="Подробнее"
                    />
                </Card.Action>

                {meeting.status === 'scheduled' &&
                    <Card.Action button>
                        <Button
                            outlined
                            label={(meeting.isRegistered || meeting.isPending) ? 'Отменить запись' : 'Зарегистрироваться'}
                            onClick={() => onRegister(meeting)}
                        />
                    </Card.Action>
                }

                {meeting.status === 'started' && meeting.isRegistered &&
                    <Card.Action button>
                        <Button
                            as="a"
                            href={meeting.joinUrl}
                            label="Подключиться"
                        />
                    </Card.Action>
                }
            </Card.Actions>
        </Card>
    );
}