import React from 'react';
import { Link } from 'react-router-dom';
import {
    List
} from 'mdc-react';

export default function MaterialList({ materials }) {
    return (
        <List className="material-list">
            {materials.map(material =>
                <List.Item
                    key={material.id}
                    component={Link}
                    to={material.url}
                    graphic={<img src={material.imageUrl} alt="" />}
                    text={material.title}
                />
            )}
        </List>
    );
}