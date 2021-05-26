import React from 'react';
import {
    LayoutGrid
} from 'mdc-react';

import MaterialCard from 'shared/components/material-card';

export default function MaterialGrid({ materials, ...props }) {
    return (
        <LayoutGrid className="materials-grid" {...props}>
            {materials?.map(material =>
                <LayoutGrid.Cell span="2">
                    <MaterialCard
                        material={material}
                    />
                </LayoutGrid.Cell>
            )}
        </LayoutGrid>
    );
}