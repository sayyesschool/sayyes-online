import { forwardRef } from 'react';

import JoyBox from '@mui/system/Box';
import classnames from 'classnames';

const Box = forwardRef(({
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Box', className);

    return (
        <JoyBox
            ref={ref}
            className={classNames}
            {...props}
        />
    );
});

Box.displayName = 'Box';

export default Box;