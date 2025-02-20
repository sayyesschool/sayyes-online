import { Link } from 'react-router-dom';

import ActionButton from 'shared/components/action-button';
import ConfirmButton from 'shared/components/confirm-button';
import {
    Chip,
    Flex,
    IconButton,
    Table,
    Text
} from 'shared/ui-components';

import styles from './MeetingsTable.module.scss';

const columns = [
    { key: 'number', content: '№' },
    { key: 'title', content: 'Тема' },
    { key: 'date', content: 'Дата и время' },
    { key: 'host', content: 'Ведущий' },
    { key: 'level', content: 'Уровень' },
    { key: 'format', content: 'Формат' },
    { key: 'participants', content: 'Участники' },
    { key: 'actions' }
];

export default function MeetingsTable({
    meetings,
    onEdit,
    onPublish,
    onDelete
}) {
    return (
        <Table className={styles.root}>
            <Table.Head>
                <Table.Row header>
                    {columns.map(column =>
                        <Table.Cell
                            key={column.key}
                            content={column.content}
                            header
                        />
                    )}
                </Table.Row>
            </Table.Head>

            <Table.Body>
                {meetings.map((meeting, index) =>
                    <Table.Row key={meeting.id}>
                        <Table.Cell>
                            {index + 1}
                        </Table.Cell>

                        <Table.Cell>
                            <Link to={`/meetings/${meeting.id}`}>
                                {meeting.title}
                            </Link>
                        </Table.Cell>

                        <Table.Cell>
                            <Flex column>
                                <Text as="span">{meeting.dateLabel}</Text>
                                <Text as="span" type="body-xs">{meeting.timeLabel}</Text>
                            </Flex>
                        </Table.Cell>

                        <Table.Cell>
                            {meeting.host ?
                                <Chip
                                    component={Link}
                                    to={`/users/${meeting.host.id}`}
                                    content={meeting.host.fullname}
                                />
                                :
                                '—'
                            }
                        </Table.Cell>

                        <Table.Cell>
                            {meeting.levelLabel || '—'}
                        </Table.Cell>

                        <Table.Cell>{meeting.online ? 'Онлайн' : 'Оффлайн'}</Table.Cell>

                        <Table.Cell>
                            {meeting.isEnded ?
                                <Text>
                                    <Text
                                        content={meeting.registrations?.filter(r => r.status === 'attended').length ?? 0}
                                        color="success"
                                        variant="soft"
                                        title="Посетили"
                                    />

                                    <Text
                                        content={meeting.registrations?.filter(r => r.status === 'missed').length ?? 0}
                                        color="danger"
                                        variant="soft"
                                        title="Пропустили"
                                    />
                                </Text>
                                :
                                <Text>
                                    <Text
                                        content={meeting.registrations?.filter(r => r.status === 'pending').length ?? 0}
                                        variant="soft"
                                        title="Ожидают подтверждения"
                                    />

                                    <Text
                                        content={meeting.registrations?.filter(r => r.status === 'approved').length ?? 0}
                                        color="success"
                                        variant="soft"
                                        title="Подтверждено"
                                    />

                                    <Text
                                        content={meeting.registrations?.filter(r => r.status === 'canceled').length ?? 0}
                                        color="danger"
                                        variant="soft"
                                        title="Отменено"
                                    />
                                </Text>
                            }
                        </Table.Cell>

                        <Table.Cell align="end">
                            <IconButton.Group size="sm">
                                <ActionButton
                                    title={meeting.published ? 'Опубликована' : 'Не опубликована'}
                                    icon={meeting.published ? 'public' : 'public_off'}
                                    color={meeting.published ? 'primary' : 'neutral'}
                                    onAction={() => onPublish(meeting)}
                                />

                                <IconButton
                                    title="Изменить"
                                    icon="edit"
                                    onClick={() => onEdit(meeting)}
                                />

                                <ConfirmButton
                                    title="Удалить"
                                    message="Удалить встречу?"
                                    icon="delete"
                                    color="danger"
                                    onConfirm={() => onDelete(meeting)}
                                />
                            </IconButton.Group>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}