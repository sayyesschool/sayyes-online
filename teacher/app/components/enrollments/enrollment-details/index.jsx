import React from 'react';
import {
    Button,
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';

export default function EnrollmentDetails({ enrollment }) {
    const [isOpen, toggleOpen] = useBoolean(false);

    return (
        <section className="enrollment-details">
            <Card>
                <Card.PrimaryAction onClick={toggleOpen}>
                    <Card.Header
                        graphic={<Icon>description</Icon>}
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
                        <List twoLine>
                            <List.Item
                                graphic={<Icon>portrait</Icon>}
                                primaryText={enrollment.ageLabel || '[Не указана]'}
                                secondaryText="Возрастная группа"
                            />

                            <List.Item
                                graphic={<Icon>grade</Icon>}
                                primaryText={enrollment.levelLabel || '[Не указан]'}
                                secondaryText="Уровень"
                            />

                            <List.Item
                                graphic={<Icon>flag</Icon>}
                                primaryText={enrollment.goal || '[Не указана]'}
                                secondaryText="Цель"
                            />

                            <List.Item
                                graphic={<Icon>person</Icon>}
                                primaryText={enrollment.manager?.fullname}
                                secondaryText="Менеджер"
                            />
                        </List>
                    </Card.Section>
                }
            </Card>
        </section>
    );
}