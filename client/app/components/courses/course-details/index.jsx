import { Text } from 'shared/ui-components';

export default function CourseDetails({ course }) {
    return (
        <section className="course-details">
            <Text><b>Юниты</b>: {course.units.length}</Text>
            <Text><b>Упражнения</b>: {course.lessons.length}</Text>
        </section>
    );
}