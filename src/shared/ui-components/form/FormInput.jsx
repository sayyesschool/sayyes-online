import cn from 'classnames';

import Input from '../input/Input';

import FormField from './FormField';

export default function FormInput({ label, message, className, ...props }) {
    const classNames = cn('ui-FormSelect', className);

    return (
        <FormField className={classNames} label={label} message={message}>
            <Input {...props} />
        </FormField>
    );
}