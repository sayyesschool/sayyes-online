import { useBoolean } from 'shared/hooks/state';
import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';
import { Avatar } from 'shared/ui-components';

export default function EnrollmentDetails({ enrollment }) {
    const [isOpen, toggleOpen] = useBoolean(false);

    return (
        <PageSection
            className="EnrollmentDetails"
            title="Детали обучения"
            actions={[{
                key: 'edit',
                icon: isOpen ? 'expand_less' : 'expand_more',
                onClick: toggleOpen
            }]}
            compact
        >
            {isOpen &&
                <DetailsList
                    items={[
                        {
                            key: 'age',
                            icon: 'portrait',
                            header: 'Возрастная группа',
                            content: enrollment.ageLabel || '[Не указана]'
                        },
                        {
                            key: 'lessonDuration',
                            icon: 'timelapse',
                            header: 'Продолжительность урока',
                            content: enrollment.lessonDuration + ' мин.'
                        },
                        {
                            key: 'levelLabel',
                            icon: 'signal_cellular_alt',
                            header: 'Уровень',
                            content: enrollment.levelLabel || '[Не указан]'
                        },
                        {
                            key: 'goal',
                            icon: 'flag',
                            header: 'Цель',
                            content: enrollment.goal || '[Не указана]'
                        },
                        {
                            key: 'experience',
                            icon: 'star',
                            header: 'Опыт',
                            content: enrollment.experience || '[Не указан]'
                        },
                        {
                            key: 'preferences',
                            icon: 'checklist',
                            header: 'Предпочтения',
                            content: enrollment.preferences || '[Не указаны]'
                        },
                        enrollment.note && {
                            key: 'note',
                            icon: 'notes',
                            header: 'Заметки',
                            content: enrollment.note
                        }
                    ]}
                />
            }
        </PageSection>
    );
}