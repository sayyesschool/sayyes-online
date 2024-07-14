import Answer from './Answer';
import { ItemTypes } from './Match';

import styles from './Match.module.scss';

export default function AnswerList({ answers, type, activeItems, onMoveAnswer, onClickAnswer }) {
    return (
        <div className={type === ItemTypes.VALUE ? styles.values : styles.translations}>
            {answers.map((answer, index) => {
                const { id, value, translation, record: { status } } = answer;
                const isValue = type === ItemTypes.VALUE;
                const isActive =
                    (activeItems.first?.id === id && activeItems.first?.type === type) ||
                    (activeItems.second?.id === id && activeItems.second?.type === type);

                const handleClickAnswer = () => onClickAnswer(answer, type);

                return (
                    <Answer
                        key={id}
                        id={id}
                        index={index}
                        text={isValue ? value : translation}
                        type={type}
                        status={isValue && status}
                        isActive={isActive}
                        onMoveAnswer={onMoveAnswer}
                        onClickAnswer={handleClickAnswer}
                    />
                );
            })}
        </div>
    );
}