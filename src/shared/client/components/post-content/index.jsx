import Content from 'shared/components/content';
import { Heading } from 'shared/ui-components';

import './index.scss';

export default function PostContent({ post }) {
    return (
        <article className="PostContent">
            {post.title &&
                <Heading
                    as="h3"
                    content={post.title}
                />
            }

            <Content content={post.content} html />
        </article>
    );
}