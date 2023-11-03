import cn from 'classnames';

import Select from '../select/Select';

import FromField from './FormField';

export default function FormSelect({ label, className, ...props }) {
    const classNames = cn('ui-FormSelect', className);

    return (
        <FromField className={classNames} label={label}>
            <Select {...props} />
        </FromField>
    );
}