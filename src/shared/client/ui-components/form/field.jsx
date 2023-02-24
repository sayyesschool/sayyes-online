import { FormFieldCustom, FormLabel } from '@fluentui/react-northstar';

export default function FormField({ label, action, children, ...props }) {
    return (
        <FormFieldCustom {...props}>
            <FormLabel>
                {label}
                {action}
            </FormLabel>

            {children}
        </FormFieldCustom>
    );
}