import classnames from 'classnames';

import { Avatar, Chip } from 'shared/ui-components';

export default function PersonChip({
    imageSrc,
    text,
    content = text,

    className,
    ...props
}) {
    const classNames = classnames('PersonChip', className);

    return (
        <Chip
            className={classNames}
            start={imageSrc &&
                <Avatar
                    imageSrc={imageSrc}
                />
            }
            color="neutral"
            variant="soft"
            content={content}
            {...props}
        />
    );
}