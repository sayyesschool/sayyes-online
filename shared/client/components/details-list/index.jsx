import {
    List
} from '@fluentui/react-northstar';

import MaterialIcon from 'shared/components/material-icon';

import './index.scss';

export default function DetailsList({ items = [], children }) {
    return (
        <List className="details-list">
            {items.filter(item => item).map(item =>
                <List.Item
                    key={item.key}
                    icon={<MaterialIcon icon={item.icon} />}
                    header={item.primaryText || '[Не указано]'}
                    content={item.secondaryText}
                    contentMedia={item.meta}
                />
            )}

            {children}
        </List>
    );
}