import React from 'react';
import {
    List,
} from 'mdc-react';

import './index.scss';

export default function DetailsList({ items = [], children }) {
    return (
        <List className="details-list" twoLine>
            {items.filter(item => item).map(item =>
                <List.Item
                    key={item.key}
                    graphic={item.graphic}
                    primaryText={item.primaryText || '[Не указано]'}
                    secondaryText={item.secondaryText}
                    meta={item.meta}
                />
            )}

            {children}
        </List>
    );
}