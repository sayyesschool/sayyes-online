import classnames from 'classnames';

export default function AppContent({ className, ...props }) {
    const classNames = classnames('AppContent', className);

    return (
        <div className={classNames} {...props} />
    );
}