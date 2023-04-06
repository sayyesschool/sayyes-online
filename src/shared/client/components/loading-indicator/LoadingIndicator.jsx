import classnames from 'classnames';

import { CircularProgress, Text } from 'shared/ui-components';

export default function LoadingIndicator({
    text,
    fullscreen,

    className,
    ...props
}) {
    const classNames = classnames(className, 'LoadingIndicator', {
        'LoadingIndicator--fullscreen': fullscreen
    });

    return (
        <div className={classNames}>
            <CircularProgress {...props} />

            {text &&
                <Text>{text}</Text>
            }
        </div>
    );
}