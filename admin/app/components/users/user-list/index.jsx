import React from 'react';
import { Link } from 'react-router-dom';
import {
    DataTable, DataTableHeader, DataTableContent, DataTableRow, DataTableCell
} from 'mdc-react';

export default function UserList({ users }) {
    return (
        <DataTable id="user-list">
            <DataTableHeader>
                <DataTableRow header>
                    <DataTableCell header>Имя и фамилия</DataTableCell>
                    <DataTableCell header>Email</DataTableCell>
                    <DataTableCell header>Роль</DataTableCell>
                </DataTableRow>
            </DataTableHeader>

            <DataTableContent>
                {users.map(user =>
                    <DataTableRow key={user.id}>
                        <DataTableCell>
                            <Link to={`/users/${user.id}`}>{user.fullname}</Link>
                        </DataTableCell>

                        <DataTableCell>{user.email}</DataTableCell>

                        <DataTableCell>{user.roleLabel}</DataTableCell>
                    </DataTableRow>
                )}
            </DataTableContent>
        </DataTable>
    );
}