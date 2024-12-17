import { forwardRef } from 'react';

import AspectRatio from '@mui/joy/AspectRatio';
import classnames from 'classnames';

import styles from './Image.module.scss';

const Image = forwardRef(({
    src,
    alt = '',
    ratio,
    sx,

    className,
    ...props
}, ref) => {
    const classNames = classnames(className, 'ui-Image', styles.root);

    return (ratio ?
        <AspectRatio
            ref={ref}
            sx={sx}
        >
            <img
                className={classNames}
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