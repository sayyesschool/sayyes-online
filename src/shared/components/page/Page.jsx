import { forwardRef } from 'react';

import LoadingIndicator from 'shared/components/loading-indicator';
import NotFound from 'shared/components/not-found';
import PageContent from 'shared/components/page-content';
import PageDrawer from 'shared/components/page-drawer';
import PageHeader from 'shared/components/page-header';
import PageSection from 'shared/components/page-section';
import cn from 'shared/utils/classnames';

import styles from './Page.module.scss';

const Page = forwardRef(({
    loading,
    notFound,
    layout,

    className,
    children,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        'Page',
        styles.root,
        layout && styles[`layout-${layout}`]
    );

    if (loading) return <LoadingIndicator />;
    if (notFound) return <NotFound />;

    return (
        <main
            ref={ref}
            className={classNames}
            {...props}
        >
            <div className={styles.container}>
                {children}
            </div>
        </main>
    );
});

Page.displayName = 'Page';

Page.Content = PageContent;
Page.Drawer = PageDrawer;
Page.Header = PageHeader;
Page.Section = PageSection;

export {
    Page as default,
    Page,
    PageContent,
    PageDrawer,
    PageHeader,
    PageSection
};