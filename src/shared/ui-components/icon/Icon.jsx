import classnames from 'classnames';

export default function Icon({
    name,
    size = 'medium',
    filled,

    as: Tag = 'i',
    children = name,
    className,
    ...props
}) {
    const classNames = classnames(className, 'ui-Icon', {
        [`ui-Icon--${size}`]: size,
        'ui-Icon--filled': filled
    });

    return (
        <Tag className={classNames} {...props}>{children}</Tag>
    );
}