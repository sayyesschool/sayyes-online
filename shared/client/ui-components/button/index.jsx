import { Button as FluentButton, ButtonGroup } from '@fluentui/react-northstar';

import Icon from 'shared/ui-components/icon';

Button.Group = ButtonGroup;

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