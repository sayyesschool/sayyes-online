import { forwardRef } from 'react';

import JoyCheckbox from '@mui/joy/Checkbox';
import classnames from 'classnames';

const Checkbox = forwardRef(({
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Checkbox', className);

    return (
        <JoyCheckbox
            ref={ref}
            className={classNames}
            {...props}
        />
    );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;