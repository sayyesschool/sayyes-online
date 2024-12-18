import ConfirmButton from 'shared/components/confirm-button';
import { StatusColor, StatusLabel } from 'shared/data/registration';
import {
    Flex,
    Link,
    Table,
    Text
} from 'shared/ui-components';

export default function MeetingsTable({ meetings, onView, onStart }) {
    return (
        <Table>
            <Table.Head>
                <Table.Row header>
                    <Table.Cell header>Тема</Table.Cell>
                    <Table.Cell header>Дата и время</Table.Cell>
                    <Table.Cell header>Уровень</Table.Cell>
                    <Table.Cell header>Формат</Table.Cell>
                    <Table.Cell header>Участники</Table.Cell>
                    <Table.Cell header />
                </Table.Row>
            </Table.Head>

            <Table.Body>
                {meetings.map(meeting =>
                    <Table.Row key={meeting.id}>
                        <Table.Cell>
                            <Link as="button" onClick={() => onView(meeting)}>
                                {meeting.title}
                            </Link>
                        </Table.Cell>

                        <Table.Cell>{meeting.datetime}</Table.Cell>

                        <Table.Cell>
                            {meeting.levelLabel || '[Уровень не назначен]'}
                        </Table.Cell>

                        <Table.Cell>{meeting.online ? 'Онлайн' : 'Оффлайн'}</Table.Cell>

                        <Table.Cell>
                            <Flex gap="xs">
                                <Text
                                    content={meeting.registrations.filter(r => r.status === 'approved').length}
                                    color={StatusColor['approved']}
                                    variant="soft"
                                    title={StatusLabel['approved']}
                                />

                                {' · '}

                                <Text
                                    content={meeting.registrations.filter(r => r.status === 'attended').length}
                                    color={StatusColor['attended']}
                                    variant="soft"
                                    title={StatusLabel['attended']}
                                />

                                {' · '}

                                <Text
                                    content={meeting.registrations.filter(r => r.status === 'missed').length}
                                    color={StatusColor['missed']}
                                    variant="soft"
                                    title={StatusLabel['missed']}
                                />
                            </Flex>
                        </Table.Cell>

                        <Table.Cell align="end">
                            {meeting.isScheduled && meeting.isOnline &&
                                <ConfirmButton
                                    content="Начать"
                                    message="Начать встречу?"
                                    description="После начала встречи участники смогут присоединиться к ней."
                                    variant="plain"
                                    closeAfterConfirm
                                    onConfirm={() => onStart(meeting)}
                                />
                            }
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}