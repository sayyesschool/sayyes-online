import { useForm } from 'shared/hooks/form';
import Form from 'shared/components/form';
import FormSelect from 'shared/components/form-select';
import FormTextArea from 'shared/components/form-textarea';

const defaultExercise = {
    title: '',
    description: ''
};

const titleOptions = [
    'Writing',
    'Listening',
    'Reading',
    'Practice',
    'Figure it out',
    'Grammar',
    'Speaking naturally',
    'Conversation Strategy'
];

export default function ExerciseForm({ exercise = defaultExercise, onSubmit, ...props }) {
    const { data, handleChange, handleSubmit } = useForm({
        fields: [
            {
                name: 'title',
                value: exercise.title || '',
                required: true,
                options: titleOptions
            },
            {
                name: 'description',
                value: exercise.description || ''
            }
        ],
        onSubmit
    }, [exercise.updatedAt]);

    return (
        <Form className="exercise-form" onSubmit={handleSubmit} noValidate {...props}>
            <FormSelect
                {...data.title}
                label="Название"
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