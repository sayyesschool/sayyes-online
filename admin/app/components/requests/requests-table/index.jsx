import { Link } from 'react-router-dom';
import {
    Chip,
    Icon,
    DataTable,
    Layout,
    Typography
} from 'mdc-react';
import moment from 'moment';

import MenuButton from 'shared/components/menu-button';

import './index.scss';

export default function RequestsTable({ requests, manager, onProcess, onEdit, onDelete }) {
    return (
        <DataTable className="requests-table">
            <DataTable.Header>
                <DataTable.HeaderRow>
                    {columns.map(col =>
                        <DataTable.HeaderCell key={col.key}>
                            {col.text}
                        </DataTable.HeaderCell>
                    )}
                </DataTable.HeaderRow>
            </DataTable.Header>

            <DataTable.Content>
                {requests.map(request =>
                    <DataTable.Row key={request.id}>
                        <DataTable.Cell>
                            {request.description}
                        </DataTable.Cell>

                        <DataTable.Cell>
                            <Chip
                                leadingIcon={<Icon>{request.statusIcon}</Icon>}
                                text={request.statusLabel}
                                outlined
                            />
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {moment(request.createdAt).format('dd, D MMM, H:mm')}
                        </DataTable.Cell>

                        <DataTable.Cell>
                            <Layout column>
                                <Typography element="span" type="body1" noMargin>{request.contact.name}</Typography>
                                <Typography element="span" type="body2" noMargin>{request.contact.phone}</Typography>
                            </Layout>
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {request.client ?
                                <Chip
                                    component={Link}
                                    to={`/clients/${request.client.id}`}
                                    text={request.client.fullname}
                                    outlined
                                />
                                :
                                '[Отсутствует]'
                            }
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {request.manager ?
                                <Chip
                                    component={Link}
                                    to={`/managers/${request.manager.id}`}
                                    text={request.manager.fullname}
                                    outlined
                                />
                                :
                                '[Отсутствует]'
                            }
                        </DataTable.Cell>

                        <DataTable.Cell numeric>
                            <MenuButton
                                menuProps={{
                                    modal: true
                                }}
                                items={[
                                    {
                                        key: 'process',
                                        text: 'Обработать',
                                        disabled: (request.manager && request.manager?.id !== manager?.id),
                                        onClick: () => onProcess(request)
                                    },
                                    {
                                        key: 'edit',
                                        text: 'Изменить',
                                        disabled: (request.manager && request.manager?.id !== manager?.id),
                                        onClick: () => onEdit(request)
                                    },
                                    {
                                        key: 'delete',
                                        text: 'Удалить',
                                        onClick: () => onDelete(request)
                                    }
                                ]}
                            />
                        </DataTable.Cell>
                    </DataTable.Row>
                )}
            </DataTable.Content>
        </DataTable>
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