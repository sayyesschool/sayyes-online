import { useMaterials } from 'shared/hooks/materials';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';
import MaterialsGrid from 'shared/components/materials-grid';

export default function MaterialsPage() {
    const [materials] = useMaterials();

    if (!materials) return <LoadingIndicator />;

    return (
        <Page id="materials-page">
            <PageTopBar
                title="Материалы"
            />

            <PageContent>
                <MaterialsGrid
                    materials={materials}
                />
            </PageContent>
        </Page>
    );
}