import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    Chip,
    Icon,
    DataTable,
    Layout,
    Typography
} from 'mdc-react';
import moment from 'moment';

import MenuButton from 'app/components/shared/menu-button';

export default function RequestList({ requests, onEdit, onTransformToClient, onDelete }) {
    const items = requests.map(request => ({
        key: request.id,
        value: request.id,
        ...request
    }));

    const columns = useMemo(() => [
        {
            key: 'status',
            text: 'Статус'
        },
        {
            key: 'user',
            text: 'Контакт'
        },
        {
            key: 'datetime',
            text: 'Дата и время'
        },
        {
            key: 'managers',
            text: 'Менеджеры'
        },
        {
            key: 'note',
            text: 'Заметка'
        }
    ], []);

    return (
        <DataTable id="request-list">
            <DataTable.Header>
                <DataTable.HeaderRow>
                    {columns.map(col =>
                        <DataTable.HeaderCell
                            key={col.key}
                        >
                            {col.text}
                        </DataTable.HeaderCell>
                    )}
                </DataTable.HeaderRow>
            </DataTable.Header>

            <DataTable.Content>
                {items.map(item =>
                    <DataTable.Row key={item.id}>
                        <DataTable.Cell>
                            <Chip
                                leadingIcon={<Icon>{statusIcons[item.status]}</Icon>}
                                text={item.statusLabel}
                            />
                        </DataTable.Cell>

                        <DataTable.Cell>
                            <Layout column>
                                <Typography element="span" variant="body1" noMargin>{item.contact.firstname}</Typography>
                                <Typography element="span" variant="body2" noMargin>{item.contact.phone}</Typography>
                            </Layout>
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {moment(item.createdAt).format('dd, D MMM, H:mm')}
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {item.managers.map(manager =>
                                <Chip key={manager.id} text={manager.fullname} />
                            )}
                        </DataTable.Cell>

                        <DataTable.Cell>
                            <Typography noMargin>{item.contact.note}</Typography>
                        </DataTable.Cell>

                        <DataTable.Cell numeric>
                            <MenuButton
                                items={[
                                    {
                                        key: 'edit',
                                        text: 'Изменить',
                                        onClick: () => onEdit(item)
                                    },
                                    {
                                        key: 'tranfsorm',
                                        text: 'Перевести в клиента',
                                        onClick: () => onTransformToClient(item)
                                    },
                                    {
                                        key: 'delete',
                                        text: 'Удалить',
                                        onClick: () => onDelete(item)
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

const statusIcons = {
    new: 'new_releases',
    pending: 'pending',
    resolved: 'StatusCircleCheckmark',
    rejected: 'StatusCircleErrorX',
};