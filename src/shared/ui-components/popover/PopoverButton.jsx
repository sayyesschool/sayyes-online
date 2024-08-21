import { Button, IconButton, Popover } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

export default function PopoverButton({
    content,
    className,
    children,
    popoverProps,
    ...props
}) {
    const classNames = cn(className, 'ui-PopoverButton');

    return (
        <Popover
            trigger={content ?
                <Button
                    className={classNames}
                    content={content}
                    {...props}
                /> :
                <IconButton
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