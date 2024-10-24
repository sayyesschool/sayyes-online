import { getStatusDifference } from 'shared/libs/quiz';
import { Button, Chip, List, Surface } from 'shared/ui-components';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

import styles from './VocabularyQuizStatistic.module.scss';

export default function VocabularyQuizStatistic({ statistic, onContinue, onBack }) {
    return (
        <Surface className={styles.root} variant="outlined">
            <List size="lg">
                {statistic.map(({ id, value, oldStatus, newStatus }) => {
                    const status = newStatus - oldStatus;
                    const chipColor =
                        status > 0
                            ? 'success'
                            : status < 0
                                ? 'danger'
                                : 'neutral';

                    return (
                        <List.Item
                            key={id}
                            decorator={
                                <LexemeStatus
                                    level={newStatus}
                                    tooltipPlacement="left"
                                    readOnly
                                />
                            }
                            content={value}
                            slotProps={{
                                endAction: { sx: { position: 'static', transform: 'none' } }
                            }}
                            end={
                                <Chip
                                    content={getStatusDifference(oldStatus, newStatus)}
                                    size="sm"
                                    variant="soft"
                                    color={chipColor}
                                />
                            }
                        />
                    );
                })}
            </List>

            <Button
                content="Продолжить"
                onClick={onContinue}
            />

            <Button
                content="Вернуться в словарь"
                variant="plain"
                onClick={onBack}
            />
        </Surface>
    );
}