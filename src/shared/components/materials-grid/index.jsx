import { Link } from 'react-router-dom';

import MaterialCard from 'shared/components/material-card';
import { Grid } from 'shared/ui-components';

export default function MaterialGrid({ materials, ...props }) {
    return (
        <Grid className="MaterialsGrid" spacing={2} {...props}>
            {materials?.map(material =>
                <Grid.Item key={material.id} lg={2}>
                    <MaterialCard
                        as={Link}
                        to={material.url}
                        material={material}
                    />
                </Grid.Item>
            )}
        </Grid>
    );
}