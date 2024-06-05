import { Button, Popover } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

export default function PopoverButton({
    className,
    children,
    popoverProps,
    ...props
}) {
    const classNames = cn(className, 'ui-PopoverButton');

    return (
        <Popover
            trigger={
                <Button
                    className={classNames}
                    {...props}
                />
            }
            {...popoverProps}
        >
            {children}
        </Popover>
    );
}