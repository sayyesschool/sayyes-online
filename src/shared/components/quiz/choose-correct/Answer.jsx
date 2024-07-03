import { useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { DragItem } from 'shared/ui-components';

import styles from './ChooseCorrect.module.scss';

const ItemTypes = {
    ANSWER: 'answer'
};

export default function Answer({ answer, moveAnswer, isDropZone }) {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.ANSWER,
        item: { id: answer?.id },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.ANSWER,
        drop: item => moveAnswer(item.id),
        canDrop: item => {
            const isDifferentItem = item.id !== answer?.id;
            const isHiddenItem = answer?.isHidden && item.id === answer?.id;

            return isDropZone ? isDifferentItem : isHiddenItem;
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    });
    const isEmpty = !answer || (answer?.isHidden && !isDropZone);
    const className = isDropZone ? styles.chooseItemDrop : styles.chooseItem;

    const onDrop = useCallback(
        () => moveAnswer(answer?.id),
        [answer?.id, moveAnswer]
    );

    return (
        <DragItem
            ref={isEmpty ? drop : node => drag(drop(node))}
            isDragging={isDragging}
            isOver={isOver}
            canDrop={canDrop}
            isEmpty={isEmpty}
            className={className}
            onDrop={onDrop}
        >
            {answer?.translation}
        </DragItem>
    );
}