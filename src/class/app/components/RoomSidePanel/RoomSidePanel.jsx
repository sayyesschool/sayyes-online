import { Heading, IconButton } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';

export default function RoomSidePanel({
    open,
    title,
    onClose,

    children,
    ...props
}) {
    const classNames = classnames('RoomSidePanel', {
        'RoomSidePanel--open': open
    });

    return (
        <aside className={classNames} {...props}>
            <div className="RoomSidePanel__header">
                <Heading type="h5">{title}</Heading>

                <IconButton
                    icon="close"
                    size="sm"
                    onClick={onClose}
                />
            </div>

            <div className="RoomSidePanel__content">
                {children}
            </div>
        </aside>
    );
}