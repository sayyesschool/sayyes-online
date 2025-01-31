import { Route, Switch } from 'react-router-dom';

import LessonsPage from './lessons-page';

export default function Lessons() {
    return (
        <Switch>
            <Route
                path="/lessons"
                component={LessonsPage}
                exact
            />
        </Switch>
    );
}