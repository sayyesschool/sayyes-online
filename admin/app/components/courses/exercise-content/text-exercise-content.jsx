import React from 'react';

export default function TextExerciseContent({ exercise }) {
    console.log(exercise);
    return (
        <div className="text-exercise-content" dangerouslySetInnerHTML={{ __html: exercise.text }} />
    );
}