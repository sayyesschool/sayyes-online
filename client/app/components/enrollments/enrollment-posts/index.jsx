import React, { useCallback } from 'react';

import PostsFeed from 'shared/components/posts-feed';

import './index.scss';

export default function EnrollmentPosts({ enrollment }) {
    const beforeCreate = useCallback(data => {
        data.enrollment = enrollment.id;
        data.teacher = enrollment.teacher;
        data.client = enrollment.client;

        return data;
    }, [enrollment]);

    return (
        <section className="enrollment-posts">
            <PostsFeed
                query={{ enrollment: enrollment.id }}
                beforeCreate={beforeCreate}
            />
        </section>
    );
}