export default function TextExerciseContent({ exercise }) {
    return (
        <div
            className="text-exercise-content"
            dangerouslySetInnerHTML={{ __html: exercise.text }}
        />
    );
}