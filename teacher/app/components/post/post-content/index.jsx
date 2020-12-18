import React from 'react';

export default function PostContent({ post }) {
    return (
        <article dangerouslySetInnerHTML={{ __html: post.content }} />
    );
}