import { Route, Switch } from 'react-router-dom';

import Vocabularies from 'shared/components/vocabularies-page';
import Vocabulary from 'shared/components/vocabulary-page';

export default function CourseRouter() {
    return (
        <Switch>
            <Route path="/vocabulary" component={Vocabularies} exact />
            <Route path="/vocabulary/:vocabulary" component={Vocabulary} exact />
        </Switch>
    );
}