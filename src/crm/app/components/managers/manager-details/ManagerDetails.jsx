import { useContext } from 'react';

import CopyButton from 'shared/components/copy-button';
import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';
import DataContext from 'shared/contexts/data';
import datetime from 'shared/libs/datetime';
import { Image } from 'shared/ui-components';

export default function ManagerDetails({ manager }) {
    const data = useContext(DataContext);

    return (
        <PageSection
            className="manager-details"
            title="Общая информация"
            compact
        >
            {manager.imageUrl &&
                <Image
                    src={manager.imageUrl}
                    alt=""
                />
            }

            <DetailsList
                items={[
                    {
                        key: 'phone',
                        icon: 'phone',
                        header: 'Телефон',
                        content: manager.phone || '[Не указан]',
                        end: manager.phone && <CopyButton size="sm" copyContent={manager.phone} />
                    },
                    {
                        key: 'email',
                        icon: 'email',
                        header: 'Электронная почта',
                        content: manager.email || '[Не указана]',
                        end: manager.email && <CopyButton size="sm" copyContent={manager.email} />
                    },
                    {
                        key: 'dob',
                        icon: 'cake',
                        header: 'Дата рождения',
                        content: manager.dob ? datetime(manager.dob).format('DD.MM.YYYY') : '[Не указана]'
                    },
                    {
                        key: 'timezone',
                        icon: 'public',
                        header: 'Часовой пояс',
                        content: manager.timezone ? data.timezones.get(manager.timezone) : '[Не указан]'
                    },
                    manager.note && {
                        key: 'note',
                        icon: 'notes',
                        header: 'Примечание',
                        content: manager.note
                    }
                ]}
            />
        </PageSection>
    );
}