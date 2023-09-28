import cn from 'classnames';

import Input from '../input/Input';

import FromField from './FormField';

export default function FormInput({ label, message, className, ...props }) {
    const classNames = cn('ui-FormSelect', className);

    return (
        <FromField className={classNames} label={label} message={message}>
            <Input {...props} />
        </FromField>
    );
}