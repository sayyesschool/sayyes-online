import { useContext } from 'react';
import moment from 'moment';

import DataContext from 'shared/contexts/data';
import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';

import './index.scss';

export default function ClientDetails({ client }) {
    const data = useContext(DataContext);

    return (
        <PageSection title="Основные данные" className="client-details">
            <DetailsList
                items={[
                    {
                        key: 'phone',
                        icon: 'phone',
                        header: client.phone || '[Не указан]',
                        content: 'Телефон'
                    },
                    client.altPhone && {
                        key: 'altPhone',
                        icon: 'phone',
                        header: client.altPhone,
                        content: 'Дополнительный телефон',
                    },
                    {
                        key: 'email',
                        icon: 'email',
                        header: client.email || '[Не указана]',
                        content: 'Электронная почта'
                    },
                    {
                        key: 'dob',
                        icon: 'cake',
                        header: client.dob ? moment(client.dob).format('DD.MM.YYYY') : '[Не указана]',
                        content: 'Дата рождения'
                    },
                    client.address && {
                        key: 'address',
                        icon: 'location_city',
                        header: client.address,
                        content: 'Адрес'
                    },
                    {
                        key: 'timezone',
                        icon: 'public',
                        header: client.timezone ? data.timezones.get(client.timezone) : '[Не указан]',
                        content: 'Часовой пояс'
                    },
                    client.occupation && {
                        key: 'occupation',
                        icon: 'work',
                        header: client.occupation,
                        content: 'Род деятельности'
                    },
                    client.interests && {
                        key: 'interests',
                        icon: 'golf_course',
                        header: client.interests,
                        content: 'Интересы'
                    },
                    client.note && {
                        key: 'note',
                        icon: 'notes',
                        header: client.note,
                        content: 'Примечание'
                    }
                ]}
            />
        </PageSection>
    );
}