import classnames from 'classnames';

export default function AppSideSheet({ className, children, ...props }) {
    const classNames = classnames('app-side-sheet', className);

    return (
        <div
            className={classNames}
            {...props}
        >
            {children}
        </div>
    );
}