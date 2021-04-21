import React from 'react';
import {
    Card,
    Icon,
} from 'mdc-react';

import DetailsList from 'app/components/shared/details-list';

import './index.scss';

export default function EnrollmentDetails({ enrollment }) {
    return (
        <section className="enrollment-details">
            <Card>
                <Card.Header
                    graphic={<Icon>account_box</Icon>}
                    title="Основные данные"
                />

                <Card.Section>
                    <DetailsList
                        items={[
                            {
                                key: 'format',
                                graphic: <Icon>home_work</Icon>,
                                primaryText: enrollment.formatLabel,
                                secondaryText: 'Формат'
                            },
                            {
                                key: 'age',
                                graphic: <Icon>portrait</Icon>,
                                primaryText: enrollment.ageLabel,
                                secondaryText: 'Возрастная группа'
                            },
                            {
                                key: 'level',
                                graphic: <Icon>signal_cellular_alt</Icon>,
                                primaryText: enrollment.levelLabel,
                                secondaryText: 'Уровень'
                            },
                            {
                                key: 'purpose',
                                graphic: <Icon>flag</Icon>,
                                primaryText: enrollment.purposeLabel,
                                secondaryText: 'Цель'
                            },
                            {
                                key: 'experience',
                                graphic: <Icon>star</Icon>,
                                primaryText: enrollment.experience || 'Нет опыта',
                                secondaryText: 'Опыт',
                            },
                            {
                                key: 'preferences',
                                graphic: <Icon>psychology</Icon>,
                                primaryText: enrollment.preferences || 'Нет предпочтений',
                                secondaryText: 'Предпочтения'
                            },
                            enrollment.note && {
                                key: 'note',
                                graphic: <Icon>notes</Icon>,
                                primaryText: enrollment.note,
                                secondaryText: 'Примечание'
                            }
                        ]}
                    />
                </Card.Section>
            </Card>
        </section>
    );
}