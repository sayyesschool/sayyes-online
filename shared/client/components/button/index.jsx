import { Button as FluentButton } from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';

export default function Button({ icon, ...props }) {
    return (
        <FluentButton
            icon={icon && <Icon>{icon}</Icon>}
            {...props}
        />
    );
}