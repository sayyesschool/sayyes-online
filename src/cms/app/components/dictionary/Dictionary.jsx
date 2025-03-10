import { Route, Switch } from 'react-router-dom';

import DictionaryPage from './dictionary-page';

export default function Dictionary() {
    return (
        <Switch>
            <Route
                path="/dictionary"
                component={DictionaryPage}
                exact
            />
        </Switch>
    );
}