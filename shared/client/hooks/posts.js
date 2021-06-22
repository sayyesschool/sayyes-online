import { useEffect } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as postActions } from 'shared/store/modules/posts';

export function usePosts(query) {
    const [posts, actions] = useStore(state => state.posts && 'list' in state.posts ? state.posts.list : state.posts, postActions);

    useEffect(() => {
        if (!posts) {
            actions.getPosts(query);
        }
    }, [posts]);

    return [posts, actions];
}

export function usePost(id) {
    const [post, actions] = useStore(state => state.posts && 'single' in state.posts ? state.posts.single : state.post, postActions);

    useEffect(() => {
        if (!id) return;

        if (!post) {
            actions.getPost(id);
        }

        return () => actions.unsetPost();
    }, [id]);

    return [post, actions];
}