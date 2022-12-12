import { Link } from 'react-router-dom';

import Grid from 'shared/ui-components/grid';
import UnitCard from 'shared/components/unit-card';

import './index.scss';

export default function CourseContent({ course, onSelectUnit }) {
    return (
        <section className="course-content">
            <Grid columns={3}>
                {course.units.map((unit, index) =>
                    <UnitCard
                        key={unit.id}
                        as={!onSelectUnit ? Link : undefined}
                        to={!onSelectUnit ? unit.uri + (course.enrollmentId ? `?enrollmentId=${course.enrollmentId}` : '') : undefined}
                        number={index + 1}
                        unit={unit}
                        onSelectUnit={onSelectUnit}
                    />
                )}
            </Grid>
        </section>
    );
}