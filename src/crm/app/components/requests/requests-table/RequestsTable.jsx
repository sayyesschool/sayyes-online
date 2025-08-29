import { Link } from 'react-router-dom';

import ConfirmButton from 'shared/components/confirm-button';
import PersonChip from 'shared/components/person-chip';
import StatusChip from 'shared/components/status-chip';
import { RequestStatusLabel } from 'shared/data/request';
import { Flex, IconButton, Popover, Surface, Table, Text } from 'shared/ui-components';

const columns = [
    { key: 'number', text: '№' },
    { key: 'status', text: 'Статус' },
    { key: 'description', text: 'Описание' },
    { key: 'datetime', text: 'Дата и время' },
    { key: 'contact', text: 'Контакт' },
    { key: 'channel', text: 'Канал' },
    { key: 'source', text: 'Источник' },
    { key: 'learner', text: 'Ученик' },
    { key: 'manager', text: 'Менеджер' },
    { key: 'actions' }
];

export default function RequestsTable({ requests, manager, onProcess, onEdit, onDelete }) {
    return (
        <Table className="RequestsTable">
            <Table.Head>
                <Table.Row header>
                    {columns.map(col =>
                        <Table.Cell
                            key={col.key}
                            content={col.text}
                            header
                        />
                    )}
                </Table.Row>
            </Table.Head>

            <Table.Body>
                {requests.map((request, index) =>
                    <Table.Row key={request.id}>
                        <Table.Cell content={index + 1} />

                        <Table.Cell>
                            <StatusChip
                                status={request.status}
                                content={RequestStatusLabel[request.status]}
                            />
                        </Table.Cell>

                        <Table.Cell content={request.typeLabel} />

                        <Table.Cell>
                            <Flex column>
                                <Text as="span">{request.dateString}</Text>
                                <Text as="span" type="body-xs">{request.timeString}</Text>
                            </Flex>
                        </Table.Cell>

                        <Table.Cell>
                            {request.contact ?
                                <Flex column>
                                    <Text as="span">{request.contact.name}</Text>

                                    <Text
                                        as="span"
                                        type="body-sm"
                                        content={
                                            <Flex gap="xxs">
                                                {request.contact.phone && <span>{request.contact.phone}</span>}
                                                {request.contact.phone && request.contact.email && '·'}
                                                {request.contact.email && <span>{request.contact.email}</span>}
                                            </Flex>
                                        }
                                    />
                                </Flex>
                                :
                                '—'
                            }
                        </Table.Cell>

                        <Table.Cell>
                            {request.channelLabel || '—'}
                        </Table.Cell>

                        <Table.Cell>
                            {request.sourceLabel || '—'}
                        </Table.Cell>

                        <Table.Cell>
                            {request.learner ?
                                <PersonChip
                                    as={Link}
                                    to={`/learners/${request.learner.id}`}
                                    text={request.learner.fullname}
                                />
                                :
                                '—'
                            }
                        </Table.Cell>

                        <Table.Cell>
                            {request.manager ?
                                <PersonChip
                                    as={Link}
                                    to={`/managers/${request.manager.id}`}
                                    text={request.manager.fullname}
                                />
                                :
                                '—'
                            }
                        </Table.Cell>

                        <Table.Cell align="end">
                            <IconButton.Group>
                                {request.utm && (
                                    <Popover
                                        trigger={
                                            <IconButton
                                                title="Посмотреть UTM"
                                                icon="sell"
                                                size="sm"
                                            />
                                        }
                                    >
                                        <Surface padding="sm">
                                            <Text>Source: {request.utm.source}</Text>
                                            <Text>Medium: {request.utm.medium}</Text>
                                            <Text>Campaign: {request.utm.campaign}</Text>
                                            <Text>Term: {request.utm.term}</Text>
                                            <Text>Content: {request.utm.content}</Text>
                                        </Surface>
                                    </Popover>
                                )}

                                {request.data && (
                                    <Popover
                                        trigger={
                                            <IconButton
                                                title="Посмотреть данные"
                                                icon="text_snippet"
                                                size="sm"
                                            />
                                        }
                                    >
                                        <Surface padding="sm">
                                            {Object.entries(request.data).map(([key, value]) =>
                                                <Text key={key}>{key}: {value}</Text>
                                            )}
                                        </Surface>
                                    </Popover>
                                )}

                                {!request.managerId ? (
                                    <ConfirmButton
                                        title="Обработать"
                                        message="Обработать заявку?"
                                        icon="flag"
                                        size="sm"
                                        onConfirm={() => onProcess(request)}
                                    />
                                ) : (
                                    <IconButton
                                        title="Изменить"
                                        icon="edit"
                                        size="sm"
                                        onClick={() => onEdit(request)}
                                    />
                                )}

                                <ConfirmButton
                                    title="Удалить"
                                    message="Удалить заявку?"
                                    icon="delete"
                                    size="sm"
                                    onConfirm={() => onDelete(request)}
                                />
                            </IconButton.Group>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}