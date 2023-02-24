import classnames from 'classnames';

export default function TabPanel({ active, children }) {
    return (
        <div className={classnames('tab-panel', { 'tab-panel--active': active })}>
            {children}
        </div>
    );
}