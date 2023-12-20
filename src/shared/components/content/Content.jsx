import classnames from 'shared/utils/classnames';

export default function Content({
    text,
    content = text,
    html,

    children = content,
    className,
    ...props
}) {
    const classNames = classnames('Content', className);

    return html ? (
        <div
            className={classNames}
            dangerouslySetInnerHTML={{ __html: content }}
            {...props}
        />
    ) : (
        <div
            className={classNames}
            {...props}
        >
            {children}
        </div>
    );
}