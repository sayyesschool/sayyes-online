import { forwardRef } from 'react';
import classnames from 'classnames';

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';

const FormField = forwardRef(({
    label,
    message,

    className,
    children = content,
    ...props
}, ref) => {
    const classNames = classnames('ui-FormField', className);

    return (
        <FormControl ref={ref} className={classNames} {...props}>
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

export default FormField;