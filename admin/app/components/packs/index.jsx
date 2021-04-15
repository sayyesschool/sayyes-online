import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Packs from './packs-page';

export default function LessonRouter() {
    return (
        <Switch>
            <Route exact path="/packs" component={Packs} />
        </Switch>
    );
}