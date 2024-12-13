import { Route, Switch } from 'react-router-dom';

import Vocabularies from './vocabularies-page';
import Vocabulary from './vocabulary-page';

export default function DictionaryRouter() {
    return (
        <Switch>
            <Route
                path="/vocabulary"
                component={Vocabularies}
                exact
            />

            <Route
                path="/vocabulary/:vocabulary"
                component={Vocabulary}
                exact
            />
        </Switch>
    );
}