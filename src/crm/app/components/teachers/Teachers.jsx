import { Route, Switch } from 'react-router-dom';

import TeacherPage from './teacher-page';
import TeachersPage from './teachers-page';

export default function Teachers() {
    return (
        <Switch>
            <Route
                path="/teachers"
                component={TeachersPage}
                exact
            />

            <Route
                path="/teachers/:id"
                component={TeacherPage}
                exact
            />
        </Switch>
    );
}