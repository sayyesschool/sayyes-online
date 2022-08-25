import { useForm } from 'shared/hooks/form';
import Form from 'shared/components/form';
import FormDropdown from 'shared/components/form-dropdown';
import FormTextArea from 'shared/components/form-textarea';

const defaultExercise = {
    title: '',
    description: ''
};

const titleOptions = [
    'Before you begin',
    'Building language',
    'Building vocabulary',
    'Conversation strategy',
    'Getting started',
    'Grammar',
    'Listening',
    'Listening & Speaking',
    'Listening & Strategies',
    'Reading 1',
    'Reading 2',
    'Speaking naturally',
    'Strategy plus',
    'Talk about it',
    'Writing & Speaking'
];

export default function ExerciseForm({ exercise = defaultExercise, onSubmit, ...props }) {
    const { data, handleChange, handleSubmit } = useForm({
        values: {
            'title*': exercise.title || '',
            description: exercise.description || ''
        },
        onSubmit
    }, [exercise.updatedAt]);

    return (
        <Form className="exercise-form" onSubmit={handleSubmit} noValidate {...props}>
            <FormDropdown
                {...data.title}
                label="Название"
                items={titleOptions}
                search
                onChange={handleChange}
            />

            <FormTextArea
                {...data.description}
                label="Описание"
                onChange={handleChange}
            />
        </Form>
    );
}