import { Link } from 'react-router-dom';

import {
    Chip,
    Switch,
    Table,
    Text
} from 'shared/ui-components';

import styles from './MeetingsTable.module.scss';

export default function MeetingsTable({ meetings }) {
    return (
        <Table className={styles.root}>
            <Table.Head>
                <Table.Row header>
                    <Table.Cell header>Тема</Table.Cell>
                    <Table.Cell header>Дата и время</Table.Cell>
                    <Table.Cell header>Ведущий</Table.Cell>
                    <Table.Cell header>Уровень</Table.Cell>
                    <Table.Cell header>Формат</Table.Cell>
                    <Table.Cell header>Участники</Table.Cell>
                    <Table.Cell header>Опубликована</Table.Cell>
                </Table.Row>
            </Table.Head>

            <Table.Body>
                {meetings.map(meeting =>
                    <Table.Row key={meeting.id}>
                        <Table.Cell>
                            <Link to={`/meetings/${meeting.id}`}>
                                {meeting.title}
                            </Link>
                        </Table.Cell>

                        <Table.Cell>{meeting.datetime}</Table.Cell>

                        <Table.Cell>
                            {meeting.host ?
                                <Chip
                                    component={Link}
                                    to={`/users/${meeting.host.id}`}
                                    content={meeting.host.fullname}
                                />
                                :
                                '[Ведущий не назначен]'
                            }
                        </Table.Cell>

                        <Table.Cell>
                            {meeting.levelLabel || '[Уровень не назначен]'}
                        </Table.Cell>

                        <Table.Cell>{meeting.online ? 'Онлайн' : 'Оффлайн'}</Table.Cell>

                        <Table.Cell numeric>
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
                        </Table.Cell>

                        <Table.Cell>
                            <Switch
                                name="published"
                                checked={meeting.published}
                                readOnly
                            />
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}