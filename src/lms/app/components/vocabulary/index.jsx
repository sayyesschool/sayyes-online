import { Route, Switch } from 'react-router-dom';

import Vocabularies from 'lms/components/vocabulary/vocabularies-page';
import Vocabulary from 'lms/components/vocabulary/vocabulary-page';

export default function CourseRouter() {
    return (
        <Switch>
            <Route path="/vocabulary" component={Vocabularies} exact />
            <Route path="/vocabulary/:vocabulary" component={Vocabulary} exact />
        </Switch>
    );
}