import { Grid, Flex, Text } from '@fluentui/react-northstar';

import PageSection from 'shared/components/page-section';
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