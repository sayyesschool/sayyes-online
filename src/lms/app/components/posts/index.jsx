import { Route, Switch } from 'react-router-dom';

import Post from 'shared/components/post-page';

export default function PostRouter() {
    return (
        <Switch>
            <Route exact path="/enrollments/:enrollmentId/posts/:postId" component={Post} />
        </Switch>
    );
}