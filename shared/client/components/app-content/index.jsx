import classnames from 'classnames';

import './index.scss';

export default function AppContent({ fixedAdjust, className, ...props }) {
    const classNames = classnames('app-content', {
        'mdc-top-app-bar--fixed-adjust': fixedAdjust
    }, className);

    return (
        <div className={classNames} {...props} />
    );
}