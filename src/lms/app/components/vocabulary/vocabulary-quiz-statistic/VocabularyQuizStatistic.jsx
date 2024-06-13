import { useHistory } from 'react-router-dom';

import { Button } from 'shared/ui-components';

import styles from './VocabularyQuizStatistic.module.scss';

const getStatusDifference = (oldStatus, newStatus) => {
    const difference = newStatus - oldStatus;
    const sign = difference > 0 ? '+' : '';

    return `${sign}${difference}`;
};

export default function VocabularyQuizStatistic({ statistic, continueGame }) {
    const history = useHistory();
    const stats = statistic.map(({ id, value, oldStatus, newStatus }) => {
        return (
            <li key={id} className={styles.listItem}>
                <span>{value}:</span><span>{getStatusDifference(oldStatus, newStatus)}</span>
            </li>
        );
    });

    const goBack = () => history.goBack();

    return (
        <div className={styles.root}>
            <ul className={styles.list}>{stats}</ul>
            <Button content="Продолжить" onClick={continueGame} />

            <Button
                content="Вернуться в словарь"
                onClick={goBack}
            />
        </div>
    );
}