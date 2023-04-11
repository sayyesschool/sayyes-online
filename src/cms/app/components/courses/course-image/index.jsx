import { useCallback } from 'react';

import ImageSection from 'shared/components/image-section';

export default function CourseImage({ course, uploadPath, onUpdate }) {
    const handleUpdate = useCallback(image => {
        onUpdate({ image });
    }, [onUpdate]);

    return (
        <ImageSection
            className="CourseImage"
            image={course.image}
            uploadPath={uploadPath}
            onUpdate={handleUpdate}
            onDelete={handleUpdate}
        />
    );
}