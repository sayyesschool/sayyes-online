import Grid from 'shared/ui-components/grid';
import UnitCard from 'shared/components/unit-card';

import './index.scss';

export default function CourseContent({ course, onSelectUnit, onSelectLesson }) {
    return (
        <section className="course-content">
            <Grid columns={3}>
                {course.units.map((unit, index) =>
                    <UnitCard
                        key={unit.id}
                        number={index + 1}
                        unit={unit}
                        onSelectUnit={onSelectUnit}
                        onSelectLesson={onSelectLesson}
                    />
                )}
            </Grid>
        </section>
    );
}