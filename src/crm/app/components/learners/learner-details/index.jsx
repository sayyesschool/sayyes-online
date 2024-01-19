import { useContext } from 'react';
import moment from 'moment';

import DataContext from 'shared/contexts/data';
import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';

export default function LearnerDetails({ learner }) {
    const data = useContext(DataContext);

    return (
        <PageSection
            className="LearnerDetails"
            title="Основные данные"
            compact
        >
            <DetailsList
                items={[
                    {
                        key: 'phone',
                        icon: 'phone',
                        content: learner.phone || '[Не указан]',
                        header: 'Телефон'
                    },
                    learner.altPhone && {
                        key: 'altPhone',
                        icon: 'phone',
                        content: learner.altPhone,
                        header: 'Дополнительный телефон',
                    },
                    {
                        key: 'email',
                        icon: 'email',
                        content: learner.email || '[Не указана]',
                        header: 'Электронная почта'
                    },
                    {
                        key: 'dob',
                        icon: 'cake',
                        content: learner.dob ? moment(learner.dob).format('DD.MM.YYYY') : '[Не указана]',
                        header: 'Дата рождения'
                    },
                    learner.address && {
                        key: 'address',
                        icon: 'location_city',
                        content: learner.address,
                        header: 'Адрес'
                    },
                    {
                        key: 'timezone',
                        icon: 'public',
                        content: learner.timezone ? data.timezones.get(learner.timezone) : '[Не указан]',
                        header: 'Часовой пояс'
                    },
                    learner.occupation && {
                        key: 'occupation',
                        icon: 'work',
                        content: learner.occupation,
                        header: 'Род деятельности'
                    },
                    learner.interests && {
                        key: 'interests',
                        icon: 'golf_course',
                        content: learner.interests,
                        header: 'Интересы'
                    },
                    learner.note && {
                        key: 'note',
                        icon: 'notes',
                        content: learner.note,
                        header: 'Примечание'
                    }
                ]}
            />
        </PageSection>
    );
}