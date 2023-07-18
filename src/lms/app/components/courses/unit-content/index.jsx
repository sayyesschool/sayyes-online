import { Link } from 'react-router-dom';

import { Flex, Text } from 'shared/ui-components';

import LessonCard from 'app/components/courses/lesson-card';

export default function UnitContent({ course, unit }) {
    return (
        <div className="UnitContent">
            <Flex gap="medium" column>
                <div>
                    <Text type="h6">In this unit, you learn how to...</Text>
                    <div dangerouslySetInnerHTML={{ __html: unit.description }} />
                </div>

                <Flex gap="medium" column>
                    {unit.lessons.map(lesson =>
                        <LessonCard
                            key={lesson.id}
                            as={Link}
                            to={lesson.uri + (course.enrollmentId ? `?enrollmentId=${course.enrollmentId}` : '')}
                            lesson={lesson}
                        />
                    )}
                </Flex>
            </Flex>
        </div>
    );
}