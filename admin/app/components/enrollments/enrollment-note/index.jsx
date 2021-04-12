import React, { useCallback } from 'react';

import EditableTextCard from 'app/components/shared/editable-text-card';

import './index.scss';

export default function EnrollmentNote({ enrollment, onUpdate }) {
    const handleSubmit = useCallback(value => {
        return onUpdate({ note: value });
    }, []);

    return (
        <section className="enrollment-note">
            <EditableTextCard
                title="Примечание"
                subtitle="Нет примечаний"
                text={enrollment.note}
                onUpdate={handleSubmit}
            />
        </section>
    );
}