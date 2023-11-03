import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyAvatar from '@mui/joy/Avatar';

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