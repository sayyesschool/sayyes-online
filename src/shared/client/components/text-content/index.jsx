import classnames from 'classnames';

import './index.scss';

export default function TextContent({
    text,
    content,

    children = text,
    className,
    ...props
}) {
    const classNames = classnames('TextContent', className);

    return (
        <div
            className={classNames}
            dangerouslySetInnerHTML={content ? { __html: content } : undefined}
            {...props}
        >
            {children}
        </div>
    );
}