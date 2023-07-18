import { useCallback, useState } from 'react';

import { useUser } from 'shared/hooks/user';
import { Flex, Tabs } from 'shared/ui-components';

import Exercise from 'app/components/courses/exercise';

export default function LessonContent({ lesson, onExerciseProgressChange }) {
    const [user] = useUser();

    const [sectionIndex, setSectionIndex] = useState(0);

    const handleTabChange = useCallback((event, value) => {
        setSectionIndex(value);
    }, []);

    const currentSection = lesson.sections[sectionIndex];

    return (
        <section className="LessonContent">
            <Flex gap="medium" column>
                <Tabs
                    value={sectionIndex}
                    items={lesson.sections.map(section => ({
                        key: section.id,
                        content: section.title,
                        color: section === currentSection ? 'primary' : undefined
                    }))}
                    tabVariant="plain"
                    variant="plain"
                    onChange={handleTabChange}
                />

                <Flex gap="medium" column>
                    {currentSection?.exercises?.map((exercise, index) =>
                        <Exercise
                            key={exercise.id}
                            index={index}
                            user={user}
                            exercise={exercise}
                            onProgressChange={onExerciseProgressChange}
                        />
                    )}
                </Flex>
            </Flex>
        </section>
    );
}