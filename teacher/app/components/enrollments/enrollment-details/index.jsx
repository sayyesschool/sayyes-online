import {
    Avatar,
    Card,
    IconButton,
    List
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import DetailsList from 'shared/components/details-list';

export default function EnrollmentDetails({ enrollment }) {
    const [isOpen, toggleOpen] = useBoolean(false);

    return (
        <section className="enrollment-details">
            <Card>
                <Card.PrimaryAction onClick={toggleOpen}>
                    <Card.Header
                        title="Детали обучения"
                        actions={
                            <IconButton
                                icon={isOpen ? 'expand_less' : 'expand_more'}
                            />
                        }
                    />
                </Card.PrimaryAction>

                {isOpen &&
                    <Card.Section>
                        <DetailsList>
                            <List.Item
                                icon="portrait"
                                primaryText={enrollment.ageLabel || '[Не указана]'}
                                secondaryText="Возрастная группа"
                            />

                            <List.Item
                                icon="timelapse"
                                primaryText={enrollment.lessonDuration + ' мин.'}
                                secondaryText="Продолжительность урока"
                            />

                            <List.Item
                                icon="signal_cellular_alt"
                                primaryText={enrollment.levelLabel || '[Не указан]'}
                                secondaryText="Уровень"
                            />

                            <List.Item
                                icon="flag"
                                primaryText={enrollment.goal || '[Не указана]'}
                                secondaryText="Цель"
                            />

                            <List.Item
                                icon="star"
                                primaryText={enrollment.experience || '[Не указан]'}
                                secondaryText="Опыт"
                            />

                            <List.Item
                                icon="checklist"
                                primaryText={enrollment.preferences || '[Не указаны]'}
                                secondaryText="Предпочтения"
                            />

                            {enrollment.manager &&
                                <List.Item
                                    icon="person"
                                    primaryText={enrollment.manager.fullname}
                                    secondaryText="Менеджер"
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
                                    primaryText={enrollment.note}
                                    secondaryText="Заметки"
                                />
                            }
                        </DetailsList>
                    </Card.Section>
                }
            </Card>
        </section>
    );
}