import React from 'react';

import './index.scss';

export default function PostContent({ post }) {
    return (
        <article className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
    );
}