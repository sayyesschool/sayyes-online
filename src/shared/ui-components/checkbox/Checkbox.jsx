import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyCheckbox from '@mui/joy/Checkbox';

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