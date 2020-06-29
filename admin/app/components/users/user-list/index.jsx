import React from 'react';
import { Link } from 'react-router-dom';
import {
    DetailsList
} from '@fluentui/react';

export default function UserList({ users }) {
    const items = users.map(user => ({
        key: user.id,
        value: user.id,
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.roleLabel
    }));

    return (
        <section id="user-list">
            <DetailsList
                items={items}
                compact={false}
                columns={columns}
                setKey="none"
                isHeaderVisible={true}
            />
        </section>
    );
}

const columns = [
    {
        key: 'fullname',
        name: 'Имя и фамилия',
        fieldName: 'fullname',
        data: 'string',
        minWidth: 100,
        maxWidth: 256,
        isRowHeader: true,
        isPadded: true,
        onRender: item => <Link to={`/${item.id}`}>{item.fullname}</Link>
    },
    {
        key: 'email',
        name: 'Email',
        fieldName: 'email',
        data: 'string',
        minWidth: 100,
        isRowHeader: true,
        isPadded: true
    },
    {
        key: 'role',
        name: 'Роль',
        fieldName: 'role',
        data: 'string',
        minWidth: 100,
        isRowHeader: true,
        isPadded: true
    }
];