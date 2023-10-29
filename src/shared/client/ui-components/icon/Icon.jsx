import classnames from 'classnames';

export default function Icon({
    name,
    size = 'medium',

    children = name,
    className,
    ...props
}) {
    const classNames = classnames('ui-Icon', {
        [`ui-Icon--${size}`]: size
    }, className);

    return (
        <i className={classNames} {...props}>{children}</i>
    );
}