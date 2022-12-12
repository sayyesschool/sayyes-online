import { Button as FluentButton, ButtonGroup } from '@fluentui/react-northstar';
import { forwardRef } from 'react';

import Icon from 'shared/ui-components/icon';

const Button = forwardRef(({ icon, content, ...props }, ref) => {
    return (
        <FluentButton
            ref={ref}
            icon={icon && <Icon>{icon}</Icon>}
            content={content}
            iconOnly={icon && !content}
            {...props}
        />
    );
});

Button.Group = ButtonGroup;

export default Button;