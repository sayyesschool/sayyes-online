import { useCallback } from 'react';

import PostsFeed from 'shared/components/posts-feed';
import PageSection from 'shared/components/page-section';

export default function EnrollmentPosts({ enrollment }) {
    const beforeCreate = useCallback(data => {
        data.enrollment = enrollment.id;
        data.teacher = enrollment.teachers[0];
        data.client = enrollment.client;

        return data;
    }, [enrollment]);

    return (
        <PageSection
            className="EnrollmentPosts"
            sx={{ backgroundColor: 'transparent' }}
            compact
        >
            <PostsFeed
                query={{ enrollment: enrollment.id }}
                beforeCreate={beforeCreate}
            />
        </PageSection>
    );
}