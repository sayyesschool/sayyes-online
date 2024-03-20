import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyFormLabel from '@mui/joy/FormLabel';

const FormLabel = forwardRef(({
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-FormLabel', className);

    return (
        <JoyFormLabel
            ref={ref}
            className={classNames}
            {...props}
        />
    );
});

FormLabel.displayName = 'FormLabel';

export default FormLabel;