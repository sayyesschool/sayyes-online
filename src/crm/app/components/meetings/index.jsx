import { Route, Switch } from 'react-router-dom';

import Meeting from './meeting-page';
import Meetings from './meetings-page';

export default function MeetingRouter() {
    return (
        <Switch>
            <Route
                path="/meetings"
                component={Meetings}
                exact
            />

            <Route
                path="/meetings/:meetingId"
                component={Meeting}
                exact
            />
        </Switch>
    );
}