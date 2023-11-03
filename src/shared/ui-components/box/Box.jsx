import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyBox from '@mui/system/Box';

const Box = forwardRef(({
    className,
    ...props
}, ref) => {
    const classNames = classnames(className, 'ui-Box');

    return (
        <JoyBox
            ref={ref}
            className={classNames}
            {...props}
        />
    );
});

export default Box;