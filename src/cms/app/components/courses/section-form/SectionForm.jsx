import { useForm } from 'shared/hooks/form';
import Form from 'shared/ui-components/form';

const defaultSection = {
    title: ''
};

const titleOptions = [
    'After you watch',
    'Before you begin',
    'Before you watch',
    'Building language',
    'Building vocabulary',
    'Conversation strategy',
    'Getting started',
    'Grammar',
    'Listening',
    'Listening & Speaking',
    'Listening & Strategies',
    'Quiz',
    'Reading 1',
    'Reading 2',
    'Speaking naturally',
    'Strategy plus',
    'Talk about it',
    'While you watch',
    'Writing & Speaking'
];

export default function SectionForm({ section = defaultSection, onSubmit, ...props }) {
    const { data, handleChange, handleSubmit } = useForm({
        values: {
            'title*': section.title
        },
        onSubmit
    }, [section.updatedAt]);

    return (
        <Form
            className="SectionForm"
            noValidate
            onSubmit={handleSubmit}
            {...props}
        >
            <Form.Autocomplete
                {...data.title}
                label="Название"
                options={titleOptions}
                onChange={handleChange}
            />
        </Form>
    );
}