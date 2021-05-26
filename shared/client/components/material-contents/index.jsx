import React from 'react';
import {
    List
} from 'mdc-react';

export default function MaterialContents({ material, item: selectedItem, onSelect, props }) {
    return (
        <List className="material-contents" {...props}>
            {material.contents.map((item, index) =>
                <List.Item
                    key={index}
                    text={item.title}
                    activated={item === selectedItem}
                    onClick={() => onSelect(item)}
                />
            )}
        </List>
    );
}