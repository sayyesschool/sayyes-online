import { Switch, Route } from 'react-router-dom';

import Teachers from './teachers-page';
import Teacher from './teacher-page';

export default function ClientsRouter() {
    return (
        <Switch>
            <Route exact path="/teachers" component={Teachers} />
            <Route exact path="/teachers/:id" component={Teacher} />
        </Switch>
    );
}