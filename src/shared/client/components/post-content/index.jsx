import { Heading, Text } from 'shared/ui-components';

import './index.scss';

export default function PostContent({ post }) {
    return (
        <article className="PostContent">
            {post.title &&
                <Heading as="h3">{post.title}</Heading>
            }

            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
    );
}