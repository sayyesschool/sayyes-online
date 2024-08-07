import PageSection from 'shared/components/page-section';
import IconButton from 'shared/ui-components/icon-button';

import ProfileForm from './ProfileForm';

export default function Profile({ user }) {
    return (
        <PageSection
            title="Профиль"
            actions={
                <IconButton
                    key="save"
                    icon="save"
                />
            }
        >
            <ProfileForm
                profile={user}
            />
        </PageSection>
    );
}