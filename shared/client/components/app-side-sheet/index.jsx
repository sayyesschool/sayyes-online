import classnames from 'classnames';

import './index.scss';

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