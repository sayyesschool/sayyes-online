import React from 'react';

import LoadingIndicator from 'shared/components/loading-indicator';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import CoursesGrid from 'shared/components/courses-grid';

import './index.scss';

export default function Courses({ courses }) {
    if (!courses) return <LoadingIndicator />;

    return (
        <div className="courses">
            <PageHeader
                title="Курсы"
            />

            <PageContent>
                <CoursesGrid
                    courses={courses}
                />
            </PageContent>
        </div>
    );
}