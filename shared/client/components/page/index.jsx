import { forwardRef } from 'react';
import classnames from 'classnames';

import LoadingIndicator from 'shared/components/loading-indicator';
import NotFound from 'shared/components/not-found';

import PageContent from 'shared/components/page-content';
import PageHeader from 'shared/components/page-header';
import PageSection from 'shared/components/page-section';
import PageSidePanel from 'shared/components/page-side-panel';

import './index.scss';

const Page = forwardRef(function Page({ loading, notFound, className, ...props }, ref) {
    const classNames = classnames('page', className);

    if (loading) return <LoadingIndicator />;
    if (notFound) return <NotFound />;

    return (
        <main ref={ref} className={classNames} {...props} />
    );
});

Page.Content = PageContent;
Page.Header = PageHeader;
Page.Section = PageSection;
Page.SidePanel = PageSidePanel;

export { Page as default, PageContent, PageHeader, PageSection, PageSidePanel };