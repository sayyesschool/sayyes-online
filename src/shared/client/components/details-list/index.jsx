import { Icon, List, Text } from 'shared/ui-components';

import './index.scss';

export default function DetailsList({ items = [], children }) {
    return (
        <List className="sy-DetailsList">
            {items.filter(item => !!item).map(item =>
                <List.Item
                    key={item.key}
                    decorator={item.icon &&
                        <Icon>{item.icon}</Icon>
                    }
                    content={<>
                        <Text type="body2">{item.header}</Text>
                        <Text type="body1">{item.content}</Text>
                    </>}
                />
            )}

            {children}
        </List>
    );
}