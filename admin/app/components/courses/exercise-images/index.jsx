import ImagesSection from 'shared/components/images-section';

export default function ExerciseImages({ exercise, uploadPath, onUpdate }) {
    return (
        <ImagesSection
            className="exercise-images"
            images={exercise.images}
            uploadPath={uploadPath}
            onUpdate={onUpdate}
        />
    );
}