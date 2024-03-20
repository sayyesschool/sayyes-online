import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { useUser } from 'shared/hooks/user';
import { usePosts } from 'shared/hooks/posts';
import { Button, Flex, Heading, Surface } from 'shared/ui-components';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import EmptyState from 'shared/components/empty-state';
import PostCard from 'shared/components/post-card';
import PostForm from 'shared/components/post-form';

import './index.scss';

const noop = arg => arg;

export default function PostsFeed({ query, beforeCreate = noop }) {
    const [user] = useUser();
    const [posts, actions] = usePosts(query);
    const [postId, setPostId] = useState(null);

    const [isPostFormOpen, togglePostFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    return (
        <div className="PostsFeed">
            <Flex alignItems="center" justifyContent="space-between">
                <Heading as="h2">Записи</Heading>

                {
                }
            </Flex>




        </div>
    );
}