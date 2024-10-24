import { forwardRef } from 'react';

import AspectRatio from '@mui/joy/AspectRatio';
import classnames from 'classnames';

const Image = forwardRef(({
    src,
    alt = '',
    ratio,
    sx,

    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Image', className);

    return (ratio ?
        <AspectRatio
            ref={ref}
            className={classNames}
            sx={sx}
        >
            <img
                src={src}
                alt={alt}
                {...props}
            />
        </AspectRatio>
        :
        <img
            className={classNames}
            src={src}
            alt={alt}
            {...props}
        />
    );
});

Image.displayName = 'Image';

export default Image;