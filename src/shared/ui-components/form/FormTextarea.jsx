import { forwardRef } from 'react';

import cn from 'classnames';

import Textarea from '../textarea/Textarea';

import FormField from './FormField';

const FormTextarea = forwardRef(({
    label,
    message,
    orientation,
    className,
    ...props
}, ref) => {
    const classNames = cn('ui-FormTextarea', className);

    return (
        <FormField
            className={classNames}
            label={label}
            message={message}
            orientation={orientation}
        >
            <Textarea ref={ref} {...props} />
        </FormField>
    );
});

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;