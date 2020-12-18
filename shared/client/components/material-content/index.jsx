import React, { useState } from 'react';
import {
    Card,
    LayoutGrid,
    List
} from 'mdc-react';

export default function MaterialContent({ material, ...props }) {
    const [item, setItem] = useState(null);

    return (
        <LayoutGrid>
            <LayoutGrid.Cell span="3">
                <Card outlined>
                    <Card.Header
                        title={material.title}
                        subtitle={material.subtitle}
                    />

                    <List>
                        {material.contents.map((_item, index) =>
                            <List.Item
                                key={index}
                                text={_item.title}
                                activated={item === _item}
                                onClick={() => setItem(_item)}
                            />
                        )}
                    </List>
                </Card>
            </LayoutGrid.Cell>

            <LayoutGrid.Cell span="9">
                <Card outlined>
                    {item ?
                        <iframe src={item.documentUrl} />
                        :
                        <img src={material.imageUrl} />
                    }
                </Card>
            </LayoutGrid.Cell>
        </LayoutGrid>
    );
}