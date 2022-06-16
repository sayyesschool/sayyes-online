import { Dialog as FluentDialog } from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';

import './index.scss';

export default function Dialog({
    open,
    title,
    content,
    children = content,
    onClose,
    ...props
}) {
    return (
        <FluentDialog
            className="dialog"
            open={open}
            header={title}
            headerAction={{
                icon: <Icon>close</Icon>,
                title: 'Закрыть',
                onClick: onClose
            }}
            content={{
                content: children
            }}
            onClose={onClose}
            {...props}
        />
    );
}