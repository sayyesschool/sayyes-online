import { useContext } from 'react';

import { useBoolean } from 'shared/hooks/state';
import DataContext from 'shared/contexts/data';
import { Button } from 'shared/ui-components';
import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';

export default function EnrollmentClient({ client }) {
    const data = useContext(DataContext);

    const [isOpen, toggleOpen] = useBoolean(false);

    return (
        <PageSection
            className="enrollment-client"
            title="Детали студента"
            actions={
                <Button
                    icon={isOpen ? 'expand_less' : 'expand_more'}
                    text
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
                                header: client.phone || '[Не указан]',
                                content: 'Телефон'
                            },
                            {
                                key: 'email',
                                icon: 'email',
                                header: client.email || '[Не указан]',
                                content: 'Электронная почта'
                            },
                            {
                                key: 'dob',
                                icon: 'cake',
                                header: client.dob ? moment(client.dob).format('DD.MM.YYYY') : '[Не указана]',
                                content: 'Дата рождения'
                            },
                            {
                                key: 'timezone',
                                icon: 'public',
                                header: client.timezone ? data.timezones.get(client.timezone) : '[Не указан]',
                                content: 'Часовой пояс'
                            },
                            {
                                key: 'address',
                                icon: 'location_city',
                                header: client.address || '[Не указан]',
                                content: 'Адрес'
                            },
                            {
                                key: 'occupation',
                                icon: 'work',
                                header: client.occupation || '[Не указана]',
                                content: 'Род деятельности'
                            },
                            {
                                key: 'interests',
                                icon: 'golf_course',
                                header: client.interests || '[Не указаны]',
                                content: 'Интересы'
                            }
                        ]}
                    />

                    {client.note}
                </>
            }
        </PageSection>
    );
}