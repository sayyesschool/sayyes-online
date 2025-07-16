import { forwardRef } from 'react';

import JoyAvatar from '@mui/joy/Avatar';
import classnames from 'classnames';

const Avatar = forwardRef(({
    content,
    imageSrc,
    imageUrl = imageSrc,

    children = content,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Avatar', className);

    return (
        <JoyAvatar
            ref={ref}
            className={classNames}
            src={imageUrl}
            {...props}
        >
            {!imageUrl && children}
        </JoyAvatar>
    );
});

Avatar.displayName = 'Avatar';

export default Avatar;