import React, { useState } from 'react';

import { useMaterial } from 'shared/hooks/materials';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageSideSheet from 'shared/components/page-side-sheet';
import PageContent from 'shared/components/page-content';
import MaterialContent from 'shared/components/material-content';
import MaterialContents from 'shared/components/material-contents';

import './index.scss';

export default function MaterialPage({ match }) {
    const [material] = useMaterial(match.params.id);

    const [selectedItem, setSelectedItem] = useState(null);
    const [isSideSheetOpen, setSideSheetOpen] = useState(true);

    if (!material) return <LoadingIndicator />;

    return (
        <Page id="material-page">
            {material.contents?.length > 0 &&
                <PageSideSheet
                    title="Содержание"
                    open={isSideSheetOpen}
                    appear
                    onClose={() => setSideSheetOpen(v => !v)}
                >
                    <MaterialContents
                        material={material}
                        item={selectedItem}
                        onSelect={setSelectedItem}
                    />
                </PageSideSheet>
            }

            <PageContent>
                <MaterialContent
                    material={material}
                    item={selectedItem}
                />
            </PageContent>
        </Page>
    );
}