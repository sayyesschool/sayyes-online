import { Label, Text } from '@fluentui/react-northstar';

import './index.scss';

export default function EnrollmentMeta({ enrollment }) {
    return (
        <section className="enrollment-meta">
            <div className="enrollment-meta__section">
                <Text>{enrollment.managers.length > 1 ? 'Менеджеры' : 'Менеджер'}: </Text>

                {enrollment.managers.map(manager =>
                    <Label
                        key={manager.id}
                        className="person-label"
                        image={manager?.imageUrl}
                        content={manager?.fullname}
                    />
                )}
            </div>

            {enrollment.teachers.length > 0 &&
                <div className="enrollment-meta__section">
                    <Text>{enrollment.teachers.length > 1 ? 'Преподаватели' : 'Преподаватель'}: </Text>

                    {enrollment.teachers.map(teacher =>
                        <Label
                            key={teacher.id}
                            className="person-label"
                            image={teacher?.imageUrl}
                            content={teacher?.fullname}
                        />
                    )}
                </div>
            }
        </section>
    );
}