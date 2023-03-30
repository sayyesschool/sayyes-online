import { Link } from 'react-router-dom';

import LessonCard from 'shared/components/lesson-card';
import { Flex } from 'shared/ui-components';

import './index.scss';

export default function UnitContent({ course, unit, onSelect }) {
    return (
        <section className="unit-content">
            <Flex gap="medium" column>
                {unit.lessons.map(lesson =>
                    <LessonCard
                        key={lesson.id}
                        as={!onSelect ? Link : undefined}
                        to={!onSelect ? lesson.uri + (course.enrollmentId ? `?enrollmentId=${course.enrollmentId}` : '') : undefined}
                        lesson={lesson}
                    />
                )}
            </Flex>
        </section>
    );
}