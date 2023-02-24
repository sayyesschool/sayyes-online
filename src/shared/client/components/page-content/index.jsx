import classnames from 'classnames';

import './index.scss';

export default function PageContent({ className, ...props }) {
    const classNames = classnames('page-content', className);

    return (
        <div className={classNames} {...props} />
    );
}