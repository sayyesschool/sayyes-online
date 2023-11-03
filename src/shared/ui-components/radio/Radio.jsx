import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyRadio from '@mui/joy/Radio';

const Radio = forwardRef(({
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Radio', className);

    return (
        <JoyRadio
            ref={ref}
            className={classNames}
            {...props}
        />
    );
});

export default Radio;