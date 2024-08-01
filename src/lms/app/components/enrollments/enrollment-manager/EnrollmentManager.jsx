import PageSection from 'shared/components/page-section';
import { Avatar, IconButton, List, MenuButton } from 'shared/ui-components';

export default function EnrollmentManager({ enrollment }) {
    const { manager } = enrollment;

    return (
        <PageSection
            className="EnrollmentManager"
            title="Менеджер"
            compact
        >
            <List>
                <List.Item
                    key={manager.id}
                    decorator={
                        <Avatar
                            imageUrl={manager.imageUrl}
                            text={manager.initials}
                        />
                    }
                    content={manager.fullname}
                    endAction={
                        <MenuButton
                            trigger={
                                <IconButton
                                    icon="more_vert"
                                    color="neutral"
                                    size="sm"
                                    variant="plain"
                                />
                            }
                            items={[
                                {
                                    key: 'whatsapp',
                                    element: 'a',
                                    href: `https://wa.me/${manager.phone}`,
                                    target: '_blank',
                                    content: 'Написать в What\'s App'
                                },
                                {
                                    key: 'email',
                                    element: 'a',
                                    href: `mailto:${manager.email}`,
                                    target: '_blank',
                                    content: 'Написать письмо'
                                },
                                {
                                    key: 'email',
                                    element: 'a',
                                    href: `tel:${manager.phone}`,
                                    target: '_blank',
                                    content: 'Позвонить'
                                }
                            ]}
                        />
                    }
                />
            </List>
        </PageSection>
    );
}