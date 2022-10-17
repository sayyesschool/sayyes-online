import { Link } from 'react-router-dom';
import moment from 'moment';

import { Button, Flex, Icon, Pill, Table, Text } from 'shared/ui-components';
import StatusLabel from 'shared/components/status-label';

import './index.scss';

export default function RequestsTable({ requests, manager, onProcess, onEdit, onDelete }) {
    return (
        <Table className="requests-table">
            <Table.Row header>
                {columns.map(col =>
                    <Table.Cell
                        key={col.key}
                        content={col.text}
                    />
                )}
            </Table.Row>

            {requests.map(request =>
                <Table.Row key={request.id}>
                    <Table.Cell content={request.description} />

                    <Table.Cell
                        content={
                            <StatusLabel
                                status={request.status}
                                content={request.statusLabel}
                            />
                        }
                    />

                    <Table.Cell
                        content={moment(request.createdAt).format('dd, D MMM, H:mm')}
                    />

                    <Table.Cell
                        content={
                            <Flex column>
                                <Text as="span">{request.contact.name}</Text>
                                <Text as="span">{request.contact.phone}</Text>
                            </Flex>
                        }
                    />

                    <Table.Cell
                        content={request.client ?
                            <Pill
                                as={Link}
                                to={`/clients/${request.client.id}`}
                                content={request.client.fullname}
                                appearance="inverted"
                            />
                            :
                            '[Отсутствует]'
                        }
                    />

                    <Table.Cell
                        content={request.manager ?
                            <Pill
                                as={Link}
                                to={`/managers/${request.manager.id}`}
                                content={request.manager.fullname}
                                appearance="inverted"
                            />
                            :
                            '[Отсутствует]'
                        }
                    />

                    <Table.Cell
                        content={
                            <Button.Group
                                buttons={[
                                    {
                                        key: 'process',
                                        title: 'Обработать',
                                        icon: <Icon>assignment</Icon>,
                                        iconOnly: true,
                                        text: true,
                                        disabled: (request.manager && request.manager?.id !== manager?.id),
                                        onClick: () => onProcess(request)
                                    },
                                    {
                                        key: 'edit',
                                        title: 'Изменить',
                                        icon: <Icon>edit</Icon>,
                                        iconOnly: true,
                                        text: true,
                                        disabled: (request.manager && request.manager?.id !== manager?.id),
                                        onClick: () => onEdit(request)
                                    },
                                    {
                                        key: 'delete',
                                        title: 'Удалить',
                                        icon: <Icon>delete</Icon>,
                                        iconOnly: true,
                                        text: true,
                                        onClick: () => onDelete(request)
                                    }
                                ]}
                            />
                        }
                    />
                </Table.Row>
            )}
        </Table>
    );
}

const columns = [
    {
        key: 'description',
        text: 'Описание'
    },
    {
        key: 'status',
        text: 'Статус'
    },
    {
        key: 'datetime',
        text: 'Дата и время'
    },
    {
        key: 'contact',
        text: 'Контакт'
    },
    {
        key: 'client',
        text: 'Клиент'
    },
    {
        key: 'manager',
        text: 'Менеджер'
    },
    {
        key: 'actions',
        text: ''
    }
];