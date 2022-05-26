import { useContext } from 'react';
import { Image } from '@fluentui/react-northstar';
import moment from 'moment';

import DataContext from 'shared/contexts/data';
import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';

export default function ManagerDetails({ manager }) {
    const data = useContext(DataContext);

    return (
        <PageSection
            className="manager-details"
            title="Общая информация"
        >
            {manager.imageUrl &&
                <Image
                    src={manager.imageUrl}
                    alt=""
                    fluid
                />
            }

            <DetailsList
                items={[
                    {
                        key: 'phone',
                        icon: 'phone',
                        header: manager.phone || '[Не указан]',
                        content: 'Телефон'
                    },
                    {
                        key: 'email',
                        icon: 'email',
                        header: manager.email || '[Не указана]',
                        content: 'Электронная почта'
                    },
                    {
                        key: 'dob',
                        icon: 'cake',
                        header: manager.dob ? moment(manager.dob).format('DD.MM.YYYY') : '[Не указана]',
                        content: 'Дата рождения'
                    },
                    {
                        key: 'timezone',
                        icon: 'public',
                        header: manager.timezone ? data.timezones.get(manager.timezone) : '[Не указан]',
                        content: 'Часовой пояс'
                    },
                    manager.note && {
                        key: 'note',
                        icon: 'notes',
                        header: manager.note,
                        content: 'Примечание'
                    }
                ]}
            />
        </PageSection>
    );
}