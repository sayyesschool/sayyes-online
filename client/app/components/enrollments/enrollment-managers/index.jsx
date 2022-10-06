import { Avatar, Button, List, MenuButton } from '@fluentui/react-northstar';

import Icon from 'shared/ui-components/icon';
import PageSection from 'shared/components/page-section';

import './index.scss';

export default function EnrollmentManagers({ enrollment }) {
    return (
        <PageSection
            className="enrollment-managers"
            title={enrollment.managers.length > 1 ? 'Менеджеры' : 'Менеджер'}
        >
            <List>
                {enrollment.managers.map(manager =>
                    <List.Item
                        key={manager.id}
                        media={
                            <Avatar
                                image={manager.imageUrl}
                                name={manager.fullname}
                                size="large"
                            />
                        }
                        header={manager.firstname}
                        content={manager.lastname}
                        endMedia={
                            <MenuButton
                                trigger={
                                    <Button
                                        icon={<Icon>more_vert</Icon>}
                                        iconOnly
                                        text
                                    />
                                }
                                menu={[
                                    {
                                        key: 'whatsapp',
                                        element: 'a',
                                        href: `https://wa.me/${manager.phone}`, target: '_blank',
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
                )}
            </List>
        </PageSection>
    );
}