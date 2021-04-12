import React, { useCallback } from 'react';

import EditableTextCard from 'app/components/shared/editable-text-card';

import './index.scss';

export default function EnrollmentPreferences({ enrollment, onUpdate }) {
    const handleSubmit = useCallback(value => {
        return onUpdate({ preferences: value });
    }, []);

    return (
        <section className="enrollment-preferences">
            <EditableTextCard
                title="Предпочтения"
                subtitle="Нет предпочтений"
                text={enrollment.preferences}
                onUpdate={handleSubmit}
            />
        </section>
    );
}