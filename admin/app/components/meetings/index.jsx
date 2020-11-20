import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Meetings from './meetings-page';
import Meeting from './meeting-page';

export default function MeetingRouter() {
    return (
        <Switch>
            <Route exact path="/meetings" component={Meetings} />
            <Route exact path="/meetings/:meetingId" component={Meeting} />
        </Switch>
    );
}