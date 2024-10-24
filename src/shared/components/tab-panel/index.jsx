import classnames from 'shared/utils/classnames';

import './index.scss';

export default function TabPanel({ active, children }) {
    const classNames = classnames('TabPanel', {
        'TabPanel--active': active
    });

    return (
        <div className={classNames}>
            {children}
        </div>
    );
}