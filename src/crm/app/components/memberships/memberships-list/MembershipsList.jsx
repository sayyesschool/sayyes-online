import ConfirmButton from 'shared/components/confirm-button';
import { Flex, List, Text } from 'shared/ui-components';

import MembershipRegistrationsCounter from 'crm/components/memberships/membership-registrations-counter';

export default function MembershipsList({ memberships, onClick, onDelete }) {
    return (
        <List className="MembershipsList">
            {memberships.map(membership =>
                <List.Item
                    key={membership.id}
                    content={
                        <Flex align="center" gap="l">
                            <Flex dir="column">
                                <Text content={`${membership.price} руб.`} type="body-md" />
                                <Text content={`${membership.startDateString} - ${membership.endDateString}`} type="body-sm" />
                            </Flex>

                            <MembershipRegistrationsCounter membership={membership} />
                        </Flex>
                    }
                    endAction={
                        <ConfirmButton
                            icon="delete"
                            title="Удалить"
                            message="Удалить абонемент?"
                            color="danger"
                            onConfirm={() => onDelete(membership)}
                        />
                    }
                    onClick={() => onClick(membership)}
                />
            )}
        </List>
    );
}