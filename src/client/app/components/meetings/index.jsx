import { Route, Switch } from 'react-router-dom';

import Meetings from './meetings-page';
import Meeting from './meeting-page';

import './index.scss';

export default function MeetingsRouter() {
    return (
        <Switch>
            <Route exact path="/meetings" component={Meetings} />
            <Route exact path="/meetings/:id" component={Meeting} />
        </Switch>
    );
}