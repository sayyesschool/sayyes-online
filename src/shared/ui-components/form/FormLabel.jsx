import { forwardRef } from 'react';

import JoyFormLabel from '@mui/joy/FormLabel';
import classnames from 'classnames';

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