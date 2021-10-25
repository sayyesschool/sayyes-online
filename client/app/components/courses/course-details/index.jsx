import {
    Typography
} from 'mdc-react';

export default function CourseDetails({ course }) {
    return (
        <section className="course-details">
            <Typography type="subtitle2"><b>Юниты</b>: {course.units.length}</Typography>
            <Typography type="subtitle2"><b>Упражнения</b>: {course.lessons.length}</Typography>
        </section>
    );
}