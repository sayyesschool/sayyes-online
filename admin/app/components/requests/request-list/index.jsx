import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    DetailsList,
    SelectionMode,
    Icon,
    IconButton,
    Persona,
    Stack,
    Text,
    PersonaSize
} from '@fluentui/react';
import moment from 'moment';

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
            minWidth: 64,
            maxWidth: 96,
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
            minWidth: 100,
            maxWidth: 256,
            onRender: item => (
                <Stack horizontal horizontalAlign="space-between">
                    <Persona
                        size={PersonaSize.size24}
                        primaryText={item.contact.firstname}
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
            minWidth: 100,
            maxWidth: 256,
            onRender: item => moment(item.createdAt).format('dd, D MMM, H:mm')
        },
        {
            key: 'managers',
            name: 'Менеджеры',
            fieldName: 'managers',
            minWidth: 100,
            maxWidth: 256,
            onRender: item => item.managers.map(manager =>
                <Persona
                    size={PersonaSize.size24}
                    primaryText={manager.fullname}
                />
            )
        },
        {
            key: 'note',
            name: 'Заметка',
            fieldName: 'note',
            minWidth: 100
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