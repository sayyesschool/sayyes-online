import React from 'react';
import {
    List,
} from 'mdc-react';

import './index.scss';

export default function DetailsList({ items }) {
    return (
        <List className="details-list" twoLine>
            {items.filter(item => item).map(item =>
                <List.Item
                    key={item.key}
                    graphic={item.graphic}
                    primaryText={item.primaryText}
                    secondaryText={item.secondaryText}
                    meta={item.meta}
                />
            )}
        </List>
    );
}