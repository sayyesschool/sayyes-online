import { Link } from 'react-router-dom';
import moment from 'moment';

import PersonChip from 'shared/components/person-chip';
import StatusChip from 'shared/components/status-chip';
import { Flex, IconButton, Table, Text } from 'shared/ui-components';
import { RequestStatusLabel } from 'shared/data/request';

const columns = [
    { key: 'description', text: 'Описание' },
    { key: 'status', text: 'Статус' },
    { key: 'datetime', text: 'Дата и время' },
    { key: 'contact', text: 'Контакт' },
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
                                <Text as="span" type="body3">{request.timeString}</Text>
                            </Flex>
                        </Table.Cell>

                        <Table.Cell>
                            <Flex column>
                                <Text as="span">{request.contact.name}</Text>
                                <Text as="span" type="body3">{request.contact.phone}</Text>
                            </Flex>
                        </Table.Cell>

                        <Table.Cell>
                            {request.client ?
                                <PersonChip
                                    as={Link}
                                    to={`/clients/${request.client.id}`}
                                    text={request.client.fullname}
                                />
                                :
                                '[Отсутствует]'
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
                                '[Отсутствует]'
                            }
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