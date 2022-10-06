import Card from 'shared/ui-components/card';

export default function CourseCard({ course, ...props }) {
    return (
        <Card outlined {...props}>
            <Card.Media imageUrl={course.imageUrl} wide />

            <Card.Header
                title={course.title}
                subtitle={`${course.units.length} юнитов`}
            />
        </Card>
    );
}