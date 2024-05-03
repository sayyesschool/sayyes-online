import { forwardRef } from 'react';

import AspectRatio from '@mui/joy/AspectRatio';
import classnames from 'classnames';

const Image = forwardRef(({
    src,
    alt = '',
    ratio,

    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Image', className);

    return (ratio ?
        <AspectRatio
            ref={ref}
            className={classNames}
            {...props}
        >
            <img
                src={src}
                alt={alt}
            />
        </AspectRatio>
        :
        <img
            className={classNames}
            src={src}
            alt={alt}
        />
    );
});

Image.displayName = 'Image';

export default Image;