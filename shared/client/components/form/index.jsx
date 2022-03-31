import { forwardRef } from 'react';
import { Form as FluentForm } from '@fluentui/react-northstar';

export default forwardRef(Form);

function Form({
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
}