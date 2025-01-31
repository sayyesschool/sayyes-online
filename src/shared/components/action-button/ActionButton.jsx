import { useState } from 'react';

import { Button, IconButton } from 'shared/ui-components';

export default function ActionButton({
    content,
    icon,
    onAction,
    ...props
}) {
    const [isLoading, setLoading] = useState(false);

    const handleClick = () => {
        const resolve = onAction?.();

        if (resolve instanceof Promise) {
            setLoading(true);
            resolve.finally(() => setLoading(false));
        }
    };

    return icon && !content ?
        <IconButton
            icon={icon}
            loading={isLoading}
            disabled={isLoading}
            {...props}
            onClick={handleClick}
        />
        :
        <Button
            content={content}
            icon={icon}
            loading={isLoading}
            disabled={isLoading}
            {...props}
            onClick={handleClick}
        />;
}