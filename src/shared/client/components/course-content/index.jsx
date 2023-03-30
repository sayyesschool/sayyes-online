import { Link } from 'react-router-dom';

import UnitCard from 'shared/components/unit-card';
import { Grid } from 'shared/ui-components';

export default function CourseContent({ course, onSelectUnit }) {
    return (
        <section className="CourseContent">
            <Grid spacing={2}>
                {course.units.map((unit, index) =>
                    <Grid.Item lg={3}>
                        <UnitCard
                            key={unit.id}
                            as={!onSelectUnit ? Link : undefined}
                            to={!onSelectUnit ? unit.uri + (course.enrollmentId ? `?enrollmentId=${course.enrollmentId}` : '') : undefined}
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