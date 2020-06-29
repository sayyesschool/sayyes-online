import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    DetailsList, DetailsListLayoutMode,
    SelectionMode,
    Icon,
    IconButton,
    Persona,
    Stack,
    Text,
    PersonaSize
} from '@fluentui/react';

export default function RequestList({ requests, onEdit, onTransform, onDelete }) {
    const items = requests.map(request => ({
        key: request.id,
        value: request.id,
        ...request
    }));

    const columns = useMemo(() => [
        {
            key: 'status',
            name: 'Статус',
            fieldName: 'status',
            data: 'string',
            minWidth: 64,
            maxWidth: 96,
            isRowHeader: true,
            onRender: item => (
                <span className="ms-TagItem">
                    <Icon iconName={statusIcons[item.status]} />
                    <Text>{item.status}</Text>
                </span>
            )
        },
        {
            key: 'user',
            name: 'Контакт',
            fieldName: 'contact',
            data: 'string',
            minWidth: 100,
            maxWidth: 256,
            isRowHeader: true,
            onRender: item => (
                <Stack horizontal horizontalAlign="space-between">
                    <Persona
                        size={PersonaSize.extraSmall}
                        primaryText={item.contact.name}
                        secondaryText={item.contact.phone}
                        showSecondaryText
                    />

                    <IconButton
                        menuIconProps={{
                            iconName: "MoreVertical"
                        }}
                        menuProps={{
                            items: [
                                {
                                    key: 'edit',
                                    text: 'Изменить',
                                    onClick: () => onEdit(item)
                                },
                                {
                                    key: 'tranfsorm',
                                    text: 'Перевести в сдудента',
                                    onClick: () => onTransform(item)
                                },
                                {
                                    key: 'delete',
                                    text: 'Удалить',
                                    onClick: () => onDelete(item)
                                },
                            ]
                        }}
                    />
                </Stack>
            )
        },
        {
            key: 'datetime',
            name: 'Дата и время',
            fieldName: 'datetime',
            data: 'string',
            minWidth: 100,
            maxWidth: 256,
            isRowHeader: true
        },
        {
            key: 'source',
            name: 'Источник',
            fieldName: 'source',
            data: 'string',
            minWidth: 100,
            maxWidth: 256,
            isRowHeader: true
        },
        {
            key: 'channel',
            name: 'Канал связи',
            fieldName: 'channel',
            data: 'string',
            minWidth: 100,
            maxWidth: 256,
            isRowHeader: true
        },
        {
            key: 'note',
            name: 'Заметка',
            fieldName: 'note',
            data: 'string',
            minWidth: 100,
            isRowHeader: true
        }
    ], []);

    return (
        <section id="request-list">
            <DetailsList
                items={items}
                compact={false}
                columns={columns}
                setKey="none"
                isHeaderVisible={true}
                selectionMode={SelectionMode.none}
            />
        </section>
    );
}

const statusIcons = {
    new: 'StatusCircleExclamation',
    pending: 'StatusCircleSync',
    resolved: 'StatusCircleCheckmark',
    rejected: 'StatusCircleErrorX',
};