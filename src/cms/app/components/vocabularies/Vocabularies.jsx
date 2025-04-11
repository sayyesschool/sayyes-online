import { Route, Switch } from 'react-router-dom';

import VocabulariesPage from './vocabularies-page';

export default function VocabulariesRouter() {
    return (
        <Switch>
            <Route
                path="/vocabularies"
                component={VocabulariesPage}
                exact
            />
        </Switch>
    );
}