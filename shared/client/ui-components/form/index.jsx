import { forwardRef } from 'react';
import { Form as FluentForm } from '@fluentui/react-northstar';

import FormCheckbox from './checkbox';
import FormDropdown from './dropdown';
import FormInput from './input';
import FormTextarea from './textarea';

const Form = forwardRef(function Form({
    preventDefault = true,
    onSubmit = Function.prototype,

    children,
    ...props
}, ref) {
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
Form.Input = FormInput;
Form.Textarea = FormTextarea;

export {
    Form as default,
    Form,
    FormCheckbox,
    FormDropdown,
    FormInput,
    FormTextarea
};