import classnames from 'classnames';

import Button from 'shared/ui-components/button';
import Icon from 'shared/ui-components/icon';

export default function BottomSheet({
    open = false,
    onClose,

    children,
    ...props
}) {
    const classNames = classnames('BottomSheet', {
        'BottomSheet--open': open
    });

    return (
        <div className={classNames} {...props}>
            <div className="BottomSheet__content">
                {children}
            </div>

            <div className="BottomSheet__actions">
                {onClose &&
                    <Button
                        icon={<Icon>close</Icon>}
                        onClick={onClose}
                    />
                }
            </div>
        </div>
    );
}