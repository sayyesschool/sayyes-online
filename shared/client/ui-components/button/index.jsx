import { Button as FluentButton } from '@fluentui/react-northstar';

import Icon from 'shared/ui-components/icon';

export default function Button({ icon, content, ...props }) {
    return (
        <FluentButton
            icon={icon && <Icon>{icon}</Icon>}
            content={content}
            iconOnly={icon && !content}
            {...props}
        />
    );
}