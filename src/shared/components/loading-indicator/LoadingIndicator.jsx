import { CircularProgress, Text } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';

export default function LoadingIndicator({
    text,
    inline,
    fluid,
    fullscreen,

    className,
    ...props
}) {
    const classNames = classnames(className, 'LoadingIndicator', {
        'LoadingIndicator--inline': inline,
        'LoadingIndicator--fluid': fluid,
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