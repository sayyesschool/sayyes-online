import classnames from 'classnames';

export default function Icon({
    name,
    size = 'medium',
    filled,

    children = name,
    className,
    ...props
}) {
    const classNames = classnames(className, 'ui-Icon', {
        [`ui-Icon--${size}`]: size,
        'ui-Icon--filled': filled
    });

    return (
        <i className={classNames} {...props}>{children}</i>
    );
}