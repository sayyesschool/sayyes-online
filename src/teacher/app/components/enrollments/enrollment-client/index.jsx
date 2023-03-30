import { useContext } from 'react';

import { useBoolean } from 'shared/hooks/state';
import DataContext from 'shared/contexts/data';
import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';
import { IconButton } from 'shared/ui-components';

export default function EnrollmentClient({ client }) {
    const data = useContext(DataContext);

    const [isOpen, toggleOpen] = useBoolean(false);

    return (
        <PageSection
            className="EnrollmentClient"
            title="Детали студента"
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