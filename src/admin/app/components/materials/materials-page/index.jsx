import { useCallback, useEffect, } from 'react';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import MaterialsGridList from 'app/components/materials/materials-grid-list';
import MaterialForm from 'app/components/materials/material-form';

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

    if (!materials) return <LoadingIndicator />;

    return (
        <Page id="materials" loading={!materials}>
            <PageHeader
                title="Материалы"
                toolbar={[
                    {
                        key: 'add',
                        title: 'Создать',
                        icon: 'add',
                        iconOnly: true,
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