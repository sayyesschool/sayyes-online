import { useCallback } from 'react';

import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';
import { useBoolean } from 'shared/hooks/state';

import MembershipForm from 'crm/components/memberships/membership-form';
import MembershipsList from 'crm/components/memberships/memberships-list';
import { useActions } from 'crm/hooks/store';

export default function LearnerMemberships({ learner, memberships }) {
    const actions = useActions('memberships');

    const [isEnrollmentFormOpen, toggleEnrollmentFormOpen] = useBoolean(false);

    const handleSubmit = useCallback(data => {
        return actions.createMembership(data);
    }, [actions]);

    return (
        <PageSection
            className="LearnerMemberships"
            title="Абонементы"
            actions={[{
                key: 'add',
                icon: 'add',
                title: 'Создать обучение',
                onClick: toggleEnrollmentFormOpen
            }]}
            compact
        >
            {memberships?.length > 0 &&
                <MembershipsList
                    memberships={memberships}
                />
            }

            <FormDialog
                title="Новый абонемент"
                open={isEnrollmentFormOpen}
                onClose={toggleEnrollmentFormOpen}
            >
                <MembershipForm
                    membership={{
                        userId: learner.id
                    }}
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </PageSection>
    );
}