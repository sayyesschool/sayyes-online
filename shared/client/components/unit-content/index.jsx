import Flex from 'shared/ui-components/flex';
import LessonCard from 'shared/components/lesson-card';

import './index.scss';

export default function UnitContent({ unit }) {
    return (
        <section className="unit-content">
            <Flex gap="gap.medium" column>
                {unit.lessons.map(lesson =>
                    <LessonCard
                        lesson={lesson}
                    />
                )}
            </Flex>
        </section>
    );
}