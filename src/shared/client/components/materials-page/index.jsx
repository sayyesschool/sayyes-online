import { useMaterials } from 'shared/hooks/materials';
import LoadingIndicator from 'shared/components/loading-indicator';
import MaterialsGrid from 'shared/components/materials-grid';
import Page from 'shared/components/page';

export default function MaterialsPage() {
    const [materials] = useMaterials();

    if (!materials) return <LoadingIndicator />;

    return (
        <Page className="MaterialsPage">
            <Page.Header
                title="Материалы"
            />

            <Page.Content>
                <MaterialsGrid
                    materials={materials}
                />
            </Page.Content>
        </Page>
    );
}