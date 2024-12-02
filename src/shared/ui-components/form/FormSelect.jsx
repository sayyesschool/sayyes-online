import cn from 'classnames';

import Select from '../select/Select';

import FormField from './FormField';

export default function FormSelect({ label, className, ...props }) {
    const classNames = cn('ui-FormSelect', className);

    return (
        <FormField className={classNames} label={label}>
            <Select {...props} />
        </FormField>
    );
}