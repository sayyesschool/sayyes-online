import classnames from 'classnames';

export default function Icon({
    name,
    size = 'medium',

    children = name,
    className,
    ...props
}) {
    const classNames = classnames(className, 'ui-Icon', {
        [`ui-Icon--${size}`]: size
    });

    return (
        <i className={classNames} {...props}>{children}</i>
    );
}