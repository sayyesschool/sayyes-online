import Icon from 'shared/ui-components/icon';
import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';

import './index.scss';

export default function EnrollmentDetails({ enrollment }) {
    return (
        <PageSection
            className="enrollment-details"
            title="Основные данные"
            compact
        >
            <DetailsList
                items={[
                    {
                        key: 'type',
                        media: <Icon>people</Icon>,
                        header: enrollment.typeLabel,
                        content: 'Тип'
                    },
                    {
                        key: 'format',
                        media: <Icon>home_work</Icon>,
                        header: enrollment.formatLabel,
                        content: 'Формат'
                    },
                    {
                        key: 'age',
                        media: <Icon>portrait</Icon>,
                        header: enrollment.ageLabel,
                        content: 'Возрастная группа'
                    },
                    {
                        key: 'teacherType',
                        media: <Icon>person</Icon>,
                        header: enrollment.teacherTypeLabel,
                        content: 'Тип преподавателя'
                    },
                    {
                        key: 'lessonDuration',
                        media: <Icon>timelapse</Icon>,
                        header: enrollment.lessonDuration + ' мин.',
                        content: 'Продолжительность урока'
                    },
                    {
                        key: 'level',
                        media: <Icon>signal_cellular_alt</Icon>,
                        header: enrollment.levelLabel,
                        content: 'Уровень'
                    },
                    {
                        key: 'purpose',
                        media: <Icon>flag</Icon>,
                        header: enrollment.purposeLabel,
                        content: 'Цель'
                    },
                    {
                        key: 'experience',
                        media: <Icon>star</Icon>,
                        header: enrollment.experience,
                        content: 'Опыт',
                    },
                    {
                        key: 'preferences',
                        media: <Icon>checklist</Icon>,
                        header: enrollment.preferences,
                        content: 'Предпочтения'
                    },
                    enrollment.note && {
                        key: 'note',
                        media: <Icon>notes</Icon>,
                        header: enrollment.note,
                        content: 'Примечание'
                    }
                ]}
            />
        </PageSection>
    );
}