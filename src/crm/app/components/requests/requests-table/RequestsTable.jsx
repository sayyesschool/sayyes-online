import { Link } from 'react-router-dom';

import PersonChip from 'shared/components/person-chip';
import StatusChip from 'shared/components/status-chip';
import { RequestStatusLabel } from 'shared/data/request';
import { Flex, IconButton, Table, Text } from 'shared/ui-components';

const columns = [
    { key: 'description', text: 'Описание' },
    { key: 'status', text: 'Статус' },
    { key: 'datetime', text: 'Дата и время' },
    { key: 'contact', text: 'Контакт' },
    { key: 'channel', text: 'Канал' },
    { key: 'source', text: 'Источник' },
    { key: 'learner', text: 'Ученик' },
    { key: 'manager', text: 'Менеджер' },
    { key: 'utm', text: 'UTM' },
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
                {requests.map(request =>
                    <Table.Row key={request.id}>
                        <Table.Cell content={request.description} />

                        <Table.Cell>
                            <StatusChip
                                status={request.status}
                                content={RequestStatusLabel[request.status]}
                            />
                        </Table.Cell>

                        <Table.Cell>
                            <Flex column>
                                <Text as="span">{request.dateString}</Text>
                                <Text as="span" type="body-sm">{request.timeString}</Text>
                            </Flex>
                        </Table.Cell>

                        <Table.Cell>
                            <Flex column>
                                <Text as="span">{request.contact.name}</Text>

                                {request.contact.email &&
                                    <Text
                                        as="span"
                                        type="body-sm"
                                        content={request.contact.email}
                                    />
                                }

                                {request.contact.phone &&
                                    <Text
                                        as="span"
                                        type="body-sm"
                                        content={request.contact.phone}
                                    />
                                }
                            </Flex>
                        </Table.Cell>

                        <Table.Cell>
                            {request.channel || '—'}
                        </Table.Cell>

                        <Table.Cell>
                            {request.source || '—'}
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

                        <Table.Cell>
                            {request.utm ? 'Есть' : '—'}
                        </Table.Cell>

                        <Table.Cell align="end">
                            <IconButton.Group
                                buttons={[
                                    {
                                        key: 'process',
                                        title: 'Обработать',
                                        icon: 'assignment',
                                        disabled: (request.manager && request.manager?.id !== manager?.id),
                                        onClick: () => onProcess(request)
                                    },
                                    {
                                        key: 'edit',
                                        title: 'Изменить',
                                        icon: 'edit',
                                        disabled: (request.manager && request.manager?.id !== manager?.id),
                                        onClick: () => onEdit(request)
                                    },
                                    {
                                        key: 'delete',
                                        title: 'Удалить',
                                        icon: 'delete',
                                        onClick: () => onDelete(request)
                                    }
                                ]}
                                align="end"
                                color="neutral"
                                variant="plain"
                                size="sm"
                            />
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}