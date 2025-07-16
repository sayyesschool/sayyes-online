import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';
import {
    AgeGroupLabel,
    FormatLabel,
    LevelLabel,
    PurposeLabel,
    TeacherTypeLabel
} from 'shared/data/common';
import { TypeLabel } from 'shared/data/enrollment';

export default function EnrollmentDetails({ enrollment }) {
    return (
        <PageSection
            className="EnrollmentDetails"
            title="Основные данные"
            compact
        >
            <DetailsList
                items={[
                    {
                        key: 'type',
                        icon: 'people',
                        header: 'Тип',
                        content: TypeLabel[enrollment.type]
                    },
                    {
                        key: 'format',
                        icon: 'home_work',
                        header: 'Формат',
                        content: FormatLabel[enrollment.format]
                    },
                    {
                        key: 'age',
                        icon: 'portrait',
                        header: 'Возрастная группа',
                        content: AgeGroupLabel[enrollment.ageGroup]
                    },
                    {
                        key: 'teacherType',
                        icon: 'person',
                        header: 'Тип преподавателя',
                        content: TeacherTypeLabel[enrollment.teacherType]
                    },
                    {
                        key: 'lessonDuration',
                        icon: 'timelapse',
                        header: 'Продолжительность урока',
                        content: enrollment.lessonDuration + ' мин.'
                    },
                    {
                        key: 'level',
                        icon: 'signal_cellular_alt',
                        header: 'Уровень',
                        content: LevelLabel[enrollment.level]
                    },
                    {
                        key: 'purpose',
                        icon: 'flag',
                        header: 'Цель',
                        content: PurposeLabel[enrollment.info.purpose]
                    },
                    {
                        key: 'experience',
                        icon: 'star',
                        header: 'Опыт',
                        content: enrollment.info.experience
                    },
                    {
                        key: 'preferences',
                        icon: 'checklist',
                        header: 'Предпочтения',
                        content: enrollment.info.preferences
                    },
                    enrollment.note && {
                        key: 'note',
                        icon: 'notes',
                        header: 'Примечание',
                        content: enrollment.info.note
                    }
                ]}
            />
        </PageSection>
    );
}