import Page from 'shared/components/page';
import { useBoolean } from 'shared/hooks/state';
import { Button, Dialog, Flex } from 'shared/ui-components';

import MembershipCard from 'club/components/memberships/membership-card';
import MembershipPurchaseForm from 'club/components/memberships/membership-purchase-form';

export default function MembershipsSection({ memberships, options, ...props }) {
    const [isDialogOpen, toggleDialogOpen] = useBoolean(false);

    if (!memberships) return null;

    const noMemberships = memberships.length === 0;
    const validMemberships = memberships.filter(m => m.isValid);
    const noValidMemberships = !noMemberships && validMemberships.length === 0;
    const showPurchaseButton = noMemberships || noValidMemberships || validMemberships.some(m => m.isExpiring);
    const title = noMemberships
        ? 'Для записи на встречи необходим абонемент'
        : memberships.length > 1
            ? 'Ваши абонементы'
            : 'Ваш абонемент';

    return (
        <Page.Section
            title={title}
            actions={showPurchaseButton &&
                <Button
                    content="Купить абонемент"
                    color="primary"
                    variant="solid"
                    onClick={toggleDialogOpen}
                />
            }
            compact
            plain
            {...props}
        >
            <Flex gap="md" wrap>
                {memberships.map(membership =>
                    <MembershipCard
                        key={membership.id}
                        membership={membership}
                        sx={{
                            flex: memberships.length > 1 ? `${membership.limit} 1 auto` : undefined,
                            boxShadow: 'lg'
                        }}
                    />
                )}
            </Flex>

            <Dialog
                title="Покупка абонемента"
                open={isDialogOpen}
                onClose={toggleDialogOpen}
            >
                <MembershipPurchaseForm
                    options={options}
                />
            </Dialog>
        </Page.Section>
    );
}