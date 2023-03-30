import { useBoolean } from 'shared/hooks/state';
import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';
import { Avatar, List } from 'shared/ui-components';

export default function EnrollmentDetails({ enrollment }) {
    const [isOpen, toggleOpen] = useBoolean(false);

    return (
        <PageSection
            className="enrollment-details"
            title="Детали обучения"
            actions={[{
                key: 'edit',
                icon: isOpen ? 'expand_less' : 'expand_more',
                onClick: toggleOpen
            }]}
            compact
        >
            {isOpen &&
                <DetailsList>
                    <List.Item
                        icon="portrait"
                        header={enrollment.ageLabel || '[Не указана]'}
                        content="Возрастная группа"
                    />

                    <List.Item
                        icon="timelapse"
                        header={enrollment.lessonDuration + ' мин.'}
                        content="Продолжительность урока"
                    />

                    <List.Item
                        icon="signal_cellular_alt"
                        header={enrollment.levelLabel || '[Не указан]'}
                        content="Уровень"
                    />

                    <List.Item
                        icon="flag"
                        header={enrollment.goal || '[Не указана]'}
                        content="Цель"
                    />

                    <List.Item
                        icon="star"
                        header={enrollment.experience || '[Не указан]'}
                        content="Опыт"
                    />

                    <List.Item
                        icon="checklist"
                        header={enrollment.preferences || '[Не указаны]'}
                        content="Предпочтения"
                    />

                    {enrollment.manager &&
                        <List.Item
                            icon="person"
                            header={enrollment.manager.fullname}
                            content="Менеджер"
                            end={
                                <Avatar
                                    src={enrollment.manager.imageUrl}
                                    text={enrollment.manager.initials}
                                />
                            }
                        />
                    }

                    {enrollment.note &&
                        <List.Item
                            icon="notes"
                            header={enrollment.note}
                            content="Заметки"
                        />
                    }
                </DetailsList>
            }
        </PageSection>
    );
}