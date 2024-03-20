import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyBox from '@mui/system/Box';

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