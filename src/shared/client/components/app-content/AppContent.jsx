import classnames from 'classnames';

export default function AppContent({ fixedAdjust, className, ...props }) {
    const classNames = classnames('AppContent', {
        'AppContent--fixed-adjust': fixedAdjust
    }, className);

    return (
        <div className={classNames} {...props} />
    );
}