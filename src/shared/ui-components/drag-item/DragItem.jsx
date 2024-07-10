import { forwardRef } from 'react';

import cn from 'shared/utils/classnames';

import styles from './DragItem.module.scss';

const DragItem = forwardRef(({
    isDragging,
    isOver,
    canDrop,
    isEmpty,
    onDrop,
    className,
    children,
    ...props
}, ref) => {
    const onClick = isEmpty ? undefined : onDrop;

    const classNames = cn(
        className,
        styles.root,
        {
            [styles.isDragging]: isDragging,
            [styles.canDrop]: canDrop,
            [styles.isEmpty]: isEmpty,
            [styles.isOver]: isOver && canDrop
        }
    );

    return (
        <div
            ref={ref}
            className={classNames}
            onClick={onClick}
            {...props}
        >
            {isEmpty ? null : children}
        </div>
    );
});

DragItem.displayName = 'DragItem';

export default DragItem;