import { Icon, List, Text } from 'shared/ui-components';

export default function DetailsList({ items = [], children }) {
    return (
        <List className="DetailsList">
            {items.filter(item => !!item).map(item =>
                <List.Item
                    key={item.key}
                    decorator={item.icon &&
                        <Icon>{item.icon}</Icon>
                    }
                    content={<>
                        <Text type="body-sm">{item.header}</Text>
                        <Text type="body-md">{item.content}</Text>
                    </>}
                    end={item.end}
                />
            )}

            {children}
        </List>
    );
}