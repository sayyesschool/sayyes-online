import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';

export default function EnrollmentMaterials({ enrollment }) {
    return (
        <div className="enrollment-materials">
            <Card outlined>
                <Card.Header
                    title="Дополнительные материалы"
                    subtitle={(!enrollment.materials || enrollment.materials.length === 0) && 'Отчетов пока нет'}
                />

                {enrollment.materials &&
                    <Card.Section>
                        <List twoLine thumbnailList>
                            {enrollment.materials?.map(material =>
                                <List.Item
                                    key={material.id}
                                    component={Link}
                                    to={`${enrollment.url}${material.url}`}
                                    graphic={<img src={material.imageUrl} />}
                                    primaryText={material.title}
                                    secondaryText={material.subtitle}
                                />
                            )}
                        </List>
                    </Card.Section>
                }
            </Card>
        </div >
    );
};