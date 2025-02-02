import { Card } from 'shared/ui-components';

export default function CourseCard({ course, ...props }) {
    return (
        <Card
            className="CourseCard"
            {...props}
        >
            <Card.Media imageUrl={course.imageUrl} wide />

            <Card.Header
                title={course.title}
                subtitle={`${course.units.length} юнитов`}
            />
        </Card>
    );
}