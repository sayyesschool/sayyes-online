import { useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import DragItem from 'shared/components/drag-item';

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

    const onDrop = useCallback(
        () => moveAnswer(answer?.id),
        [answer?.id, moveAnswer]
    );

    const isEmpty = !answer || (answer?.isHidden && !isDropZone);
    const className = isDropZone ? styles.chooseItemDrop : styles.chooseItem;

    return (
        <DragItem
            ref={isEmpty ? drop : node => drag(drop(node))}
            className={className}
            canDrop={canDrop}
            isDragging={isDragging}
            isOver={isOver}
            isEmpty={isEmpty}
            onDrop={onDrop}
        >
            {answer?.translation}
        </DragItem>
    );
}