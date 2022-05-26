import classnames from 'classnames';

import SidePanel from 'shared/components/side-panel';

import './index.scss';

export default function PageSidePanel({ className, children, ...props }) {
    const classNames = classnames('page-side-panel', className);

    return (
        <SidePanel
            className={classNames}
            dismissible
            {...props}
        >
            {children}
        </SidePanel>
    );
}