import React, { useCallback } from 'react';

import EditableTextCard from 'app/components/shared/editable-text-card';

import './index.scss';

export default function EnrollmentExperience({ enrollment, onUpdate }) {
    const handleSubmit = useCallback(value => {
        return onUpdate({ experience: value });
    }, []);

    return (
        <section className="enrollment-experience">
            <EditableTextCard
                title="Опыт"
                subtitle="Нет опыта"
                text={enrollment.experience}
                onUpdate={handleSubmit}
            />
        </section>
    );
}