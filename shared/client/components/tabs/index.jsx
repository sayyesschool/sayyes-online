import { useCallback } from 'react';
import { Menu } from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';

export default function Tabs({ items, onChange, ...props }) {
    const handleItemClick = useCallback((event, target) => onChange(target.value), [onChange]);

    return (
        <Menu
            defaultActiveIndex={0}
            items={items.map(item => ({
                ...item,
                icon: item.icon && <Icon size="small">{item.icon}</Icon>
            }))}
            underlined
            primary
            onItemClick={handleItemClick}
            {...props}
        />
    );
}