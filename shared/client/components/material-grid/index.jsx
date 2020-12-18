import React from 'react';
import {
    LayoutGrid
} from 'mdc-react';

import MaterialCard from 'shared/components/material-card';

export default function MaterialGrid({ materials, ...props }) {
    return (
        <LayoutGrid {...props}>
            {materials.map(material =>
                <LayoutGrid.Cell span="2">
                    <MaterialCard
                        material={material}
                    />
                </LayoutGrid.Cell>
            )}
        </LayoutGrid>
    );
}