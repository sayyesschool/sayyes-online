import { Route, Switch } from 'react-router-dom';

import VocabulariesPage from 'lms/components/vocabulary/vocabularies-page';
import VocabularyPage from 'lms/components/vocabulary/vocabulary-page';
import QuizPage from 'lms/components/vocabulary/vocabulary-quiz-page';

export default function VocabularyRouter() {
    return (
        <Switch>
            <Route
                path="/vocabularies"
                component={VocabulariesPage}
                exact
            />

            <Route
                path="/vocabularies/:vocabulary"
                component={VocabularyPage}
                exact
            />

            <Route
                path="/vocabularies/:vocabulary/quiz/:quiz"
                component={QuizPage}
                exact
            />
        </Switch>
    );
}