import { Link } from 'react-router-dom';

import { Grid } from 'shared/ui-components';

import UnitCard from 'lms/components/courses/unit-card';

export default function CourseContent({ course, onSelectUnit }) {
    return (
        <section className="CourseContent">
            <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
                {course.units.map((unit, index) =>
                    <Grid.Item key={unit.id}>
                        <UnitCard
                            as={!onSelectUnit ? Link : undefined}
                            to={!onSelectUnit ? (unit.uri + (course.enrollmentId ? `?enrollmentId=${course.enrollmentId}` : '')) : undefined}
                            number={index + 1}
                            unit={unit}
                            onSelectUnit={onSelectUnit}
                        />
                    </Grid.Item>
                )}
            </Grid>
        </section>
    );
}