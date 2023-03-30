import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';

export default function EnrollmentDetails({ enrollment }) {
    return (
        <PageSection
            className="sy-EnrollmentDetails"
            title="Основные данные"
            compact
        >
            <DetailsList
                items={[
                    {
                        key: 'type',
                        media: 'people',
                        header: 'Тип',
                        content: enrollment.typeLabel
                    },
                    {
                        key: 'format',
                        media: 'home_work',
                        header: 'Формат',
                        content: enrollment.formatLabel
                    },
                    {
                        key: 'age',
                        media: 'portrait',
                        header: 'Возрастная группа',
                        content: enrollment.ageLabel
                    },
                    {
                        key: 'teacherType',
                        media: 'person',
                        header: 'Тип преподавателя',
                        content: enrollment.teacherTypeLabel
                    },
                    {
                        key: 'lessonDuration',
                        media: 'timelapse',
                        header: 'Продолжительность урока',
                        content: enrollment.lessonDuration + ' мин.'
                    },
                    {
                        key: 'level',
                        media: 'signal_cellular_alt',
                        header: 'Уровень',
                        content: enrollment.levelLabel
                    },
                    {
                        key: 'purpose',
                        media: 'flag',
                        header: 'Цель',
                        content: enrollment.purposeLabel
                    },
                    {
                        key: 'experience',
                        media: 'star',
                        header: 'Опыт',
                        content: enrollment.experience,
                    },
                    {
                        key: 'preferences',
                        media: 'checklist',
                        header: 'Предпочтения',
                        content: enrollment.preferences
                    },
                    enrollment.note && {
                        key: 'note',
                        media: 'notes',
                        header: 'Примечание',
                        content: enrollment.note
                    }
                ]}
            />
        </PageSection>
    );
}