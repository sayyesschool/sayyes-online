import { useForm } from 'shared/hooks/form';
import Form from 'shared/components/form';
import FormSelect from 'shared/components/form-select';
import FormTextArea from 'shared/components/form-textarea';

const defaultExercise = {
    type: '',
    title: '',
    description: ''
};

const typeOptions = [
    {
        value: 'boolean',
        header: 'Да/Нет'
    },
    {
        value: 'choice',
        header: 'Выбор'
    },
    {
        value: 'essay',
        header: 'Эссе'
    },
    {
        value: 'fib',
        header: 'Заполнить пробелы'
    },
    {
        value: 'input',
        header: 'Ввод'
    },
    {
        value: 'text',
        header: 'Текст'
    }
];

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
                name: 'type',
                value: exercise.type || '',
                required: true,
                options: typeOptions
            },
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
                {...data.type}
                label="Тип"
                fluid
                onChange={handleChange}
            />

            <FormSelect
                {...data.title}
                label="Название"
                fluid
                onChange={handleChange}
            />

            <FormTextArea
                {...data.description}
                label="Описание"
                fluid
                onChange={handleChange}
            />
        </Form>
    );
}