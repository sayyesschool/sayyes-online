import { Route, Switch } from 'react-router-dom';

import Vocabularies from './vocabularies-page';

export default function VocabulariesRouter() {
    return (
        <Switch>
            <Route
                path="/vocabularies"
                component={Vocabularies}
                exact
            />
        </Switch>
    );
}