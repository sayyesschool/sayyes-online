import { Route, Switch } from 'react-router-dom';

import MeetingPage from './meeting-page';
import MeetingsPage from './meetings-page';

export default function Meetings() {
    return (
        <Switch>
            <Route
                path="/meetings"
                component={MeetingsPage}
                exact
            />

            <Route
                path="/meetings/:meetingId"
                component={MeetingPage}
                exact
            />
        </Switch>
    );
}