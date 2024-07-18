import { sessionCardsCount } from 'shared/libs/quiz';
import { Stepper } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import styles from './VocabularyQuizStepper.module.scss';

export default function VocabularyQuizStepper({ itemIndex, numberOfItems }) {
    const stepsCount = sessionCardsCount(numberOfItems);

    return (
        <Stepper
            className={styles.root}
            steps={Array.from({ length: stepsCount }).map((_, index) => ({
                active: index === itemIndex,
                orientation: 'vertical',
                indicator: (
                    <span
                        className={cn(
                            styles.indicator,
                            index === itemIndex && styles.active,
                            index < itemIndex && styles.prev
                        )}
                    />
                )
            }))}
            size="sm"
        />
    );
}