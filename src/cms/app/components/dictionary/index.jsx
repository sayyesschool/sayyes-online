import { Route, Switch } from 'react-router-dom';

import Dictionary from './dictionary-page';

export default function DictionaryRouter() {
    return (
        <Switch>
            <Route
                path="/dictionary"
                component={(Dictionary)}
                exact
            />
        </Switch>
    );
}