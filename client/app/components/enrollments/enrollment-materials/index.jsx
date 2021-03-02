import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    LayoutGrid
} from 'mdc-react';

export default function EnrollmentMaterials({ enrollment }) {
    return (
        <div className="enrollment-materials">
            {enrollment.materials?.length > 0 &&
                <LayoutGrid>
                    {enrollment.materials.map(material =>
                        <LayoutGrid.Cell key={material.id} span="6">
                            <Card component={Link} to={`${enrollment.url}${material.url}`} outlined>
                                <img src={material.imageUrl} />

                                <Card.Header
                                    title={material.title}
                                    subtitle={material.subtitle}
                                />
                            </Card>
                        </LayoutGrid.Cell>
                    )}
                </LayoutGrid>
            }
        </div>
    );
};