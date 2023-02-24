import { forwardRef } from 'react';
import { Form as FluentForm } from '@fluentui/react-northstar';

import FormCheckbox from './checkbox';
import FormDropdown from './dropdown';
import FormField from './field';
import FormInput from './input';
import FormLabel from './label';
import FormRadioGroup from './radio-group';
import FormSelect from './select';
import FormTextarea from './textarea';

const Form = forwardRef(({
    preventDefault = true,
    onSubmit = Function.prototype,

    children,
    ...props
}, ref) => {
    return (
        <FluentForm
            ref={ref}
            onSubmit={onSubmit}
            {...props}
        >
            <input type="hidden" name="_csrf" value={window.CSRF_TOKEN} />

            {children}
        </FluentForm>
    );
});

Form.Checkbox = FormCheckbox;
Form.Dropdown = FormDropdown;
Form.Field = FormField;
Form.Input = FormInput;
Form.Label = FormLabel;
Form.RadioGroup = FormRadioGroup;
Form.Select = FormSelect;
Form.Textarea = FormTextarea;

export {
    Form as default,
    Form,
    FormCheckbox,
    FormDropdown,
    FormField,
    FormLabel,
    FormInput,
    FormRadioGroup,
    FormSelect,
    FormTextarea
};