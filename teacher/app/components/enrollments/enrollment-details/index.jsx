import React from 'react';
import {
    Avatar,
    Card,
    Icon,
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
                                graphic={<Icon>portrait</Icon>}
                                primaryText={enrollment.ageLabel || '[Не указана]'}
                                secondaryText="Возрастная группа"
                            />

                            <List.Item
                                graphic={<Icon>timelapse</Icon>}
                                primaryText={enrollment.lessonDuration + ' мин.'}
                                secondaryText="Продолжительность урока"
                            />

                            <List.Item
                                graphic={<Icon>signal_cellular_alt</Icon>}
                                primaryText={enrollment.levelLabel || '[Не указан]'}
                                secondaryText="Уровень"
                            />

                            <List.Item
                                graphic={<Icon>flag</Icon>}
                                primaryText={enrollment.goal || '[Не указана]'}
                                secondaryText="Цель"
                            />

                            <List.Item
                                graphic={<Icon>star</Icon>}
                                primaryText={enrollment.experience || '[Не указан]'}
                                secondaryText="Опыт"
                            />

                            <List.Item
                                graphic={<Icon>checklist</Icon>}
                                primaryText={enrollment.preferences || '[Не указаны]'}
                                secondaryText="Предпочтения"
                            />

                            {enrollment.manager &&
                                <List.Item
                                    graphic={<Icon>person</Icon>}
                                    primaryText={enrollment.manager.fullname}
                                    secondaryText="Менеджер"
                                    meta={
                                        <Avatar
                                            src={enrollment.manager.imageUrl}
                                            text={enrollment.manager.initials}
                                        />
                                    }
                                />
                            }

                            {enrollment.note &&
                                <List.Item
                                    graphic={<Icon>notes</Icon>}
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