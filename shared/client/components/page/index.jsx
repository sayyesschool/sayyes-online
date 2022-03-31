import { forwardRef } from 'react';
import classnames from 'classnames';

import LoadingIndicator from 'shared/components/loading-indicator';
import NotFound from 'shared/components/not-found';

import './index.scss';

export default forwardRef(Page);

function Page({ loading, notFound, className, ...props }, ref) {
    const classNames = classnames('page', className);

    if (loading) return <LoadingIndicator />;
    if (notFound) return <NotFound />;

    return (
        <main ref={ref} className={classNames} {...props} />
    );
}