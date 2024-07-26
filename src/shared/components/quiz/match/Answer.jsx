import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import DragItem from 'shared/components/drag-item';
import cn from 'shared/utils/classnames';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

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

    const className = cn(styles.item, {
        [styles.dragging]: isDragging,
        [styles.activeItem]: isActive
    });

    drag(drop(ref));

    return (
        <DragItem
            ref={ref}
            className={className}
            data-handler-id={handlerId}
            onClick={onClickAnswer}
        >
            {text}

            {Number.isInteger(status) &&
                <LexemeStatus
                    level={status}
                    tooltipPlacement="right"
                    readOnly
                />
            }
        </DragItem>
    );
}