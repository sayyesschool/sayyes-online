import {
    LayoutGrid
} from 'mdc-react';

import UnitCard from 'shared/components/unit-card';

import './index.scss';

export default function CourseContent({ course, onSelectUnit, onSelectLesson }) {
    return (
        <section className="course-content">
            <LayoutGrid>
                {course.units.map((unit, index) =>
                    <LayoutGrid.Cell key={unit.id} span="4">
                        <UnitCard
                            number={index + 1}
                            unit={unit}
                            onSelectUnit={onSelectUnit}
                            onSelectLesson={onSelectLesson}
                        />
                    </LayoutGrid.Cell>
                )}
            </LayoutGrid>
        </section>
    );
}