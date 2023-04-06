import moment from 'moment';

import { Image } from 'shared/ui-components';
import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';
import { timezonesMap as timezones } from 'shared/data/timezones';

export default function TeacherDetails({ teacher }) {
    return (
        <PageSection className="teacher-details" compact>
            {teacher.imageUrl &&
                <Image
                    src={teacher.imageUrl}
                    ratio="1/1"
                />
            }

            <DetailsList
                items={[
                    {
                        key: 'phone',
                        icon: 'phone',
                        header: 'Телефон',
                        content: teacher.phone || '[Не указан]'
                    },
                    {
                        key: 'email',
                        icon: 'email',
                        header: 'Электронная почта',
                        content: teacher.email || '[Не указана]'
                    },
                    {
                        key: 'dob',
                        icon: 'cake',
                        header: 'Дата рождения',
                        content: teacher.dob ? moment(teacher.dob).format('DD.MM.YYYY') : '[Не указана]',
                        headerMedia: teacher.age
                    },
                    {
                        key: 'timezone',
                        icon: 'public',
                        header: 'Часовой пояс',
                        content: teacher.timezone ? timezones.get(teacher.timezone) : '[Не указан]'
                    },
                    teacher.note && {
                        key: 'note',
                        icon: 'notes',
                        header: 'Примечание',
                        content: teacher.note
                    }
                ]}
            />
        </PageSection>
    );
}