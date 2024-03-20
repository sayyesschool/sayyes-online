import classnames from 'shared/utils/classnames';

export default function AppDrawer({
    className,
    children,
    ...props
}) {
    const classNames = classnames('AppDrawer', className);

    return (
        <div
            className={classNames}
            {...props}
        >
            {children}
        </div>
    );
}