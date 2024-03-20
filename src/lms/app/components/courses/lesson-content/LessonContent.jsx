import { useCallback, useState } from 'react';

import { Chip, Flex, Tabs } from 'shared/ui-components';

import Exercise from 'lms/components/courses/exercise';

export default function LessonContent({
    lesson,
    assignments,
    user,
    onExerciseProgressChange,
    onAddExerciseToAssignment,
    onAddExerciseToNewAssignment,
    onRemoveExerciseFromAssignment
}) {
    const [sectionIndex, setSectionIndex] = useState(0);

    const handleTabChange = useCallback((event, value) => {
        setSectionIndex(value);
    }, []);

    const currentSection = lesson.sections[sectionIndex];

    return (
        <section className="Lesson">
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
                            assignments={assignments}
                            showMenu={user.role === 'teacher'}
                            onProgressChange={onExerciseProgressChange}
                            onAddToAssignment={onAddExerciseToAssignment}
                            onAddToNewAssignment={onAddExerciseToNewAssignment}
                            onRemoveFromAssignment={onRemoveExerciseFromAssignment}
                        />
                    )}
                </Flex>
            </Flex>
        </section>
    );
}