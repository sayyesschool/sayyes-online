import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { DragItem, ProgressStatus } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import styles from './Match.module.scss';

export default function Answer({
    id,
    text,
    status,
    index,
    type,
    isActive,
    onMoveAnswer,
    onClickAnswer
}) {
    const ref = useRef(null);
    const [{ isDragging }, drag] = useDrag({
        type,
        item: { id, index },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });
    const [{ handlerId }, drop] = useDrop({
        accept: type,
        hover(item, monitor) {
            if (!ref.current) return;

            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            onMoveAnswer(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
            handlerId: monitor.getHandlerId()
        })
    });

    const className = isDragging ? styles.matchItemDragging : styles.matchItem;

    drag(drop(ref));

    return (
        <DragItem
            ref={ref}
            data-handler-id={handlerId}
            className={cn(className, {
                [styles.activeMatchItem]: isActive
            })}
            onClick={onClickAnswer}
        >
            {text}

            {Number.isInteger(status) && (
                <ProgressStatus level={status} placement="right" />
            )}
        </DragItem>
    );
}