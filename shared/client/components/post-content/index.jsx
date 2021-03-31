import React from 'react';
import {
    Typography
} from 'mdc-react';

import './index.scss';

export default function PostContent({ post }) {
    return (
        <article className="post-content">
            {post.title &&
                <Typography type="headline6" className="post-title">{post.title}</Typography>
            }

            <section className="post-body" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
    );
}