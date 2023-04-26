import { useContext } from 'react';

import { useBoolean } from 'shared/hooks/state';
import DataContext from 'shared/contexts/data';
import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';
import { Avatar, IconButton, List, MenuButton, } from 'shared/ui-components';

export default function EnrollmentClient({ enrollment: { client } }) {
    const data = useContext(DataContext);

    const [isOpen, toggleOpen] = useBoolean(false);

    return (
        <PageSection
            className="EnrollmentClient"
            title="Ученик"
            actions={
                <IconButton
                    icon={isOpen ? 'expand_less' : 'expand_more'}
                    color="neutral"
                    size="sm"
                    variant="plain"
                    onClick={toggleOpen}
                />
            }
            compact
        >
            <List>
                <List.Item
                    decorator={
                        <Avatar
                            imageUrl={client.imageUrl}
                            text={client.initials}
                        />
                    }
                    content={client.fullname}
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
                                    href: `https://wa.me/${client.phone}`, target: '_blank',
                                    content: 'Написать в What\'s App'
                                },
                                {
                                    key: 'email',
                                    element: 'a',
                                    href: `mailto:${client.email}`,
                                    target: '_blank',
                                    content: 'Написать письмо'
                                },
                                {
                                    key: 'email',
                                    element: 'a',
                                    href: `tel:${client.phone}`,
                                    target: '_blank',
                                    content: 'Позвонить'
                                }
                            ]}
                        />
                    }
                />
            </List>

            {isOpen &&
                <>
                    <DetailsList
                        items={[
                            {
                                key: 'phone',
                                icon: 'phone',
                                header: 'Телефон',
                                content: client.phone || '[Не указан]'
                            },
                            {
                                key: 'email',
                                icon: 'email',
                                header: 'Электронная почта',
                                content: client.email || '[Не указан]'
                            },
                            {
                                key: 'dob',
                                icon: 'cake',
                                header: 'Дата рождения',
                                content: client.dob ? moment(client.dob).format('DD.MM.YYYY') : '[Не указана]'
                            },
                            {
                                key: 'timezone',
                                icon: 'public',
                                header: 'Часовой пояс',
                                content: client.timezone ? data.timezones.get(client.timezone) : '[Не указан]'
                            },
                            {
                                key: 'address',
                                icon: 'location_city',
                                header: 'Адрес',
                                content: client.address || '[Не указан]'
                            },
                            {
                                key: 'occupation',
                                icon: 'work',
                                header: 'Род деятельности',
                                content: client.occupation || '[Не указана]'
                            },
                            {
                                key: 'interests',
                                icon: 'golf_course',
                                header: 'Интересы',
                                content: client.interests || '[Не указаны]'
                            }
                        ]}
                    />

                    {client.note}
                </>
            }
        </PageSection>
    );
}