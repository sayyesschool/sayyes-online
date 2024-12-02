import { forwardRef } from 'react';

import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import classnames from 'classnames';

const FormField = forwardRef(({
    label,
    message,

    className,
    children,
    ...props
}, ref) => {
    const classNames = classnames('ui-FormField', className);

    return (
        <FormControl
            ref={ref}
            className={classNames}
            {...props}
        >
            {label &&
                <FormLabel>{label}</FormLabel>
            }

            {children}

            {message &&
                <FormHelperText>{message}</FormHelperText>
            }
        </FormControl>
    );
});

FormField.displayName = 'FormField';

export default FormField;