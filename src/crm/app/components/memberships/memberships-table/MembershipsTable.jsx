import { Link } from 'react-router-dom';

import ConfirmButton from 'shared/components/confirm-button';
import PersonChip from 'shared/components/person-chip';
import { IconButton, Table } from 'shared/ui-components';

import MembershipRegistrationsCounter from 'crm/components/memberships/membership-registrations-counter';

const columns = [
    { key: 'number', text: '№' },
    { key: 'user', text: 'Пользователь' },
    { key: 'price', text: 'Стоимость, руб.' },
    { key: 'duration', text: 'Срок' },
    { key: 'startDate', text: 'Дата начала' },
    { key: 'endDate', text: 'Дата окончания' },
    { key: 'registrations', text: 'Регистрации' },
    { key: 'actions' }
];

export default function MembershipsTable({ memberships, onEdit, onDelete }) {
    return (
        <Table className="MembershipsTable">
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
                {memberships.map((membership, index) =>
                    <Table.Row key={membership.id}>
                        <Table.Cell content={index + 1} />

                        <Table.Cell>
                            {membership.user &&
                                <PersonChip
                                    as={Link}
                                    to={`/learners/${membership.user.id}`}
                                    imageSrc={membership.user.imageUrl}
                                    content={membership.user.fullname || membership.user.email}
                                />
                            }
                        </Table.Cell>

                        <Table.Cell content={membership.price} />
                        <Table.Cell content={membership.durationString} />
                        <Table.Cell content={membership.startDateString} />
                        <Table.Cell content={membership.endDateString} />

                        <Table.Cell>
                            <MembershipRegistrationsCounter membership={membership} />
                        </Table.Cell>

                        <Table.Cell align="end">
                            <IconButton.Group>
                                <IconButton
                                    key="edit"
                                    title="Изменить"
                                    icon="edit"
                                    color="neutral"
                                    size="sm"
                                    variant="plain"
                                    onClick={() => onEdit(membership)}
                                />

                                <ConfirmButton
                                    key="delete"
                                    title="Удалить"
                                    message="Удалить абонемент?"
                                    icon="delete"
                                    color="neutral"
                                    size="sm"
                                    variant="plain"
                                    onClick={() => onDelete(membership)}
                                />
                            </IconButton.Group>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}