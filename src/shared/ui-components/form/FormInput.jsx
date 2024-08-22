import { forwardRef } from 'react';

import cn from 'classnames';

import Input from '../input/Input';

import FormField from './FormField';

const FormInput = forwardRef(({
    label,
    message,
    className,
    ...props
}, ref) => {
    const classNames = cn('ui-FormInput', className);

    return (
        <FormField
            className={classNames}
            label={label}
            message={message}
        >
            <Input ref={ref} {...props} />
        </FormField>
    );
});

FormInput.displayName = 'FormInput';

export default FormInput;