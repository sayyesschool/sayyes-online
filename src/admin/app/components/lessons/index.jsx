import { Switch, Route } from 'react-router-dom';

import Lessons from './lessons-page';

export default function LessonRouter() {
    return (
        <Switch>
            <Route exact path="/lessons" component={Lessons} />
        </Switch>
    );
}