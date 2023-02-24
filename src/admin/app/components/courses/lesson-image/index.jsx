import { useCallback } from 'react';

import ImageSection from 'shared/components/image-section';

export default function LessonImage({ lesson, onUpdate }) {
    const handleUpdate = useCallback(image => {
        onUpdate({ image });
    }, [onUpdate]);

    return (
        <ImageSection
            className="lesson-image"
            image={lesson.image}
            uploadPath="courses/foo/images/"
            onUpdate={handleUpdate}
            onDelete={handleUpdate}
        />
    );
}