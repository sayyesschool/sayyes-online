import { useContext } from 'react';
import moment from 'moment';

import DataContext from 'shared/contexts/data';
import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';

export default function ClientDetails({ client }) {
    const data = useContext(DataContext);

    return (
        <PageSection
            className="sy-ClientDetails"
            title="Основные данные"
            compact
        >
            <DetailsList
                items={[
                    {
                        key: 'phone',
                        icon: 'phone',
                        content: client.phone || '[Не указан]',
                        header: 'Телефон'
                    },
                    client.altPhone && {
                        key: 'altPhone',
                        icon: 'phone',
                        content: client.altPhone,
                        header: 'Дополнительный телефон',
                    },
                    {
                        key: 'email',
                        icon: 'email',
                        content: client.email || '[Не указана]',
                        header: 'Электронная почта'
                    },
                    {
                        key: 'dob',
                        icon: 'cake',
                        content: client.dob ? moment(client.dob).format('DD.MM.YYYY') : '[Не указана]',
                        header: 'Дата рождения'
                    },
                    client.address && {
                        key: 'address',
                        icon: 'location_city',
                        content: client.address,
                        header: 'Адрес'
                    },
                    {
                        key: 'timezone',
                        icon: 'public',
                        content: client.timezone ? data.timezones.get(client.timezone) : '[Не указан]',
                        header: 'Часовой пояс'
                    },
                    client.occupation && {
                        key: 'occupation',
                        icon: 'work',
                        content: client.occupation,
                        header: 'Род деятельности'
                    },
                    client.interests && {
                        key: 'interests',
                        icon: 'golf_course',
                        content: client.interests,
                        header: 'Интересы'
                    },
                    client.note && {
                        key: 'note',
                        icon: 'notes',
                        content: client.note,
                        header: 'Примечание'
                    }
                ]}
            />
        </PageSection>
    );
}