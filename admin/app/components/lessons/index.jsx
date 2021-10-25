import { Switch, Route } from 'react-router-dom';

import Lessons from './lessons-page';
// import Lesson from './lesson-page';

export default function LessonRouter() {
    return (
        <Switch>
            <Route exact path="/lessons" component={Lessons} />
            {/* <Route path="/lessons/:id" component={Lesson} /> */}
        </Switch>
    );
}