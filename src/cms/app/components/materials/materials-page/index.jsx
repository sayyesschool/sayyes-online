import { useCallback, useEffect } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageContent from 'shared/components/page-content';
import PageHeader from 'shared/components/page-header';
import { useBoolean } from 'shared/hooks/state';

import MaterialForm from 'cms/components/materials/material-form';
import MaterialsGridList from 'cms/components/materials/materials-grid-list';
import { useStore } from 'cms/store';

export default function Materials() {
    const [materials, actions] = useStore('materials.list');

    const [isFormOpen, toggleFormOpen] = useBoolean(false);

    useEffect(() => {
        actions.getMaterials();
    }, []);

    const handleSubmit = useCallback(data => {
        return actions.createMaterial(data)
            .then(() => toggleFormOpen(false));
    }, []);

    if (!materials) return <LoadingIndicator fullscreen />;

    return (
        <Page id="materials" loading={!materials}>
            <PageHeader
                title="Материалы"
                actions={[
                    {
                        key: 'add',
                        content: 'Создать материал',
                        icon: 'add',
                        variant: 'solid',
                        onClick: toggleFormOpen
                    }
                ]}
            />

            <PageContent>
                <MaterialsGridList
                    materials={materials}
                />
            </PageContent>

            <FormDialog
                title="Новый материал"
                open={isFormOpen}
                onClose={toggleFormOpen}
            >
                <MaterialForm
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </Page>
    );
}