import cn from 'classnames';

import Input from '../input/Input';

import FromField from './FormField';

export default function FormInput({ label, className, ...props }) {
    const classNames = cn('ui-FormSelect', className);

    return (
        <FromField className={classNames} label={label}>
            <Input {...props} />
        </FromField>
    );
}