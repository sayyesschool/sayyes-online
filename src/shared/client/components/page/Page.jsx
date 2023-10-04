import { forwardRef } from 'react';
import classnames from 'classnames';

import LoadingIndicator from 'shared/components/loading-indicator';
import NotFound from 'shared/components/not-found';
import PageContent from 'shared/components/page-content';
import PageDrawer from 'shared/components/page-drawer';
import PageHeader from 'shared/components/page-header';
import PageSection from 'shared/components/page-section';
import PageSidePanel from 'shared/components/page-side-panel';

const Page = forwardRef(({
    loading,
    notFound,

    className,
    ...props
}, ref) => {
    const classNames = classnames('Page', className);

    if (loading) return <LoadingIndicator />;
    if (notFound) return <NotFound />;

    return (
        <main ref={ref} className={classNames} {...props} />
    );
});

Page.Content = PageContent;
Page.Drawer = PageDrawer;
Page.Header = PageHeader;
Page.Section = PageSection;
Page.SidePanel = PageSidePanel;

export {
    Page as default,
    Page,
    PageContent,
    PageDrawer,
    PageHeader,
    PageSection,
    PageSidePanel
};