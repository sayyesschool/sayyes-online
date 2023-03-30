import classnames from 'classnames';

import './index.scss';

export default function TextContent({
    text,
    content = text,

    children = content,
    className,
    ...props
}) {
    const classNames = classnames('TextContent', className);

    return (
        <div
            className={classNames}
            dangerouslySetInnerHTML={{ __html: children }}
            {...props}
        />
    );
}