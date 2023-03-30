import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyAvatar from '@mui/joy/Avatar';

const Avatar = forwardRef(({
    text,
    imageSrc,
    imageUrl = imageSrc,

    children = text,
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

export default Avatar;