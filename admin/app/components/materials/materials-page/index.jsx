import { useCallback, useEffect, useState } from 'react';

import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
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
            <PageTopBar
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
                form="material-form"
                title="Новый материал"
                open={isFormOpen}
                modal
                onClose={() => setFormOpen(false)}
            >
                <MaterialForm
                    onSubmit={handleSubmit}
                />
            </FormPanel>
        </Page>
    );
}