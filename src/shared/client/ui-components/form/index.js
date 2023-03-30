import Form from './Form';
import FormAutocomplete from './FormAutocomplete';
import FormCheckbox from './FormCheckbox';
import FormField from './FormField';
import FormInput from './FormInput';
import FormLabel from './FormLabel';
import FormRadioGroup from './FormRadioGroup';
import FormSelect from './FormSelect';
import FormTextarea from './FormTextarea';

Form.Autocomplete = FormAutocomplete;
Form.Checkbox = FormCheckbox;
Form.Field = FormField;
Form.Input = FormInput;
Form.Label = FormLabel;
Form.RadioGroup = FormRadioGroup;
Form.Select = FormSelect;
Form.Textarea = FormTextarea;

export {
    Form as default,
    Form,
    FormAutocomplete,
    FormCheckbox,
    FormField,
    FormLabel,
    FormInput,
    FormRadioGroup,
    FormSelect,
    FormTextarea
};