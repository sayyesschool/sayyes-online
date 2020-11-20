import React, { useState, useEffect, useCallback } from 'react';
import { Card } from 'mdc-react';

import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/store';
import FormPanel from 'app/components/shared/form-panel';
import MaterialGridList from 'app/components/materials/material-grid-list';
import MaterialForm from 'app/components/materials/material-form';

export default function Materials() {
    const [materials, actions] = useStore('materials.list');

    const [isFormOpen, setFormOpen] = useState(false);

    useEffect(() => {
        actions.getMaterials();
    }, []);

    const handleSubmit = useCallback(data => {
        actions.createMaterial(data)
            .then(() => setFormOpen(false));
    }, []);

    return (
        <Page id="materials" loading={!materials}>
            <PageHeader
                title="Материалы"
                actions={[
                    {
                        key: 'add',
                        label: 'Создать',
                        icon: 'add',
                        outlined: true,
                        onClick: () => setFormOpen(true)
                    }
                ]}
            />

            <PageContent>
                <MaterialGridList
                    materials={materials}
                />
            </PageContent>

            <FormPanel
                title="Новый материал"
                open={isFormOpen}
                form="material-form"
                onClose={() => setFormOpen(false)}
            >
                <MaterialForm
                    onSubmit={handleSubmit}
                />
            </FormPanel>
        </Page>
    );
}