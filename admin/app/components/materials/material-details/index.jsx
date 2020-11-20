import React from 'react';
import {
    Card,
    IconButton
} from 'mdc-react';

import MaterialForm from '../material-form';

export default function MaterialDetails({ material, onUpdate }) {
    return (
        <Card outlined>
            <Card.Header
                title="Детали"
                actions={
                    <IconButton
                        icon="save"
                        type="submit"
                        form="material-form"
                    />
                }
            />

            <Card.Section primary>
                <MaterialForm
                    material={material}
                    onSubmit={onUpdate}
                />
            </Card.Section>
        </Card>
    );
}