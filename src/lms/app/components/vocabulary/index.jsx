import { Route, Switch } from 'react-router-dom';

import Vocabularies from 'lms/components/vocabulary/vocabularies-page';
import Vocabulary from 'lms/components/vocabulary/vocabulary-page';
import Quiz from 'lms/components/vocabulary/vocabulary-quiz';

export default function VocabularyRouter() {
    return (
        <Switch>
            <Route path="/vocabulary" component={Vocabularies} exact />
            <Route path="/vocabulary/:vocabulary" component={Vocabulary} exact />
            <Route path="/vocabulary/:vocabulary/quiz/:trainer" component={Quiz} exact />
        </Switch>
    );
}