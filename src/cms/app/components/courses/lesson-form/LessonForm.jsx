import { useForm } from 'shared/hooks/form';
import Form from 'shared/ui-components/form';

const defaultLesson = {
    title: ''
};

export default function LessonForm({ lesson = defaultLesson, onSubmit, ...props }) {
    const { data, handleChange, handleSubmit } = useForm({
        values: {
            'title*': lesson.title
        },
        onSubmit
    }, [lesson.updatedAt]);

    return (
        <Form
            className="LessonForm" noValidate
            onSubmit={handleSubmit} {...props}
        >
            <Form.Input
                {...data.title}
                label="Название"
                onChange={handleChange}
            />
        </Form>
    );
}