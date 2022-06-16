import { useContext } from 'react';
import { Image } from '@fluentui/react-northstar';
import moment from 'moment';

import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';
import DataContext from 'shared/contexts/data';

export default function TeacherDetails({ teacher }) {
    const { timezones } = useContext(DataContext);

    return (
        <PageSection className="teacher-details" compact>
            {teacher.imageUrl &&
                <Image
                    src={teacher.imageUrl}
                    square
                />
            }

            <DetailsList
                items={[
                    {
                        key: 'phone',
                        icon: 'phone',
                        header: teacher.phone || '[Не указан]',
                        content: 'Телефон'
                    },
                    {
                        key: 'email',
                        icon: 'email',
                        header: teacher.email || '[Не указана]',
                        content: 'Электронная почта'
                    },
                    {
                        key: 'dob',
                        icon: 'cake',
                        header: teacher.dob ? moment(teacher.dob).format('DD.MM.YYYY') : '[Не указана]',
                        headerMedia: teacher.age,
                        content: 'Дата рождения'
                    },
                    {
                        key: 'timezone',
                        icon: 'public',
                        header: teacher.timezone ? timezones.get(teacher.timezone) : '[Не указан]',
                        content: 'Часовой пояс'
                    },
                    teacher.note && {
                        key: 'note',
                        icon: 'notes',
                        header: teacher.note,
                        content: 'Примечание'
                    }
                ]}
            />
        </PageSection>
    );
}