import { Grid } from 'shared/ui-components';

import MaterialCard from 'shared/components/material-card';

export default function MaterialGrid({ materials, ...props }) {
    return (
        <Grid className="sy-MaterialsGrid" gap="medium" {...props}>
            {materials?.map(material =>
                <Grid.Item xs={2}>
                    <MaterialCard
                        material={material}
                    />
                </Grid.Item>
            )}
        </Grid>
    );
}