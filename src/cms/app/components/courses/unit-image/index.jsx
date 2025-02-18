import { useCallback } from 'react';

import ImageSection from 'shared/components/image-section';

export default function UnitImage({ unit, onUpdate }) {
    const handleUpdate = useCallback(image => {
        onUpdate({ image });
    }, [onUpdate]);

    return (
        <ImageSection
            className="UnitImage"
            image={unit.image}
            uploadPath={`courses/${unit.courseId}/images/`}
            onUpdate={handleUpdate}
            onDelete={handleUpdate}
        />
    );
}