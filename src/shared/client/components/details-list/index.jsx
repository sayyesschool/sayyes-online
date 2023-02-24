import Icon from 'shared/ui-components/icon';
import List from 'shared/ui-components/list';

import './index.scss';

export default function DetailsList({ items = [], children }) {
    return (
        <List className="details-list">
            {items.filter(item => item).map(item =>
                <List.Item
                    key={item.key}
                    media={item.icon && <Icon>{item.icon}</Icon>}
                    {...item}
                />
            )}

            {children}
        </List>
    );
}