import { Route, Switch } from 'react-router-dom';

import Quizzes from './pages/Quizzes';
import Quiz from './pages/Quiz';

export default function QuizRouter() {
    return (
        <Switch>
            <Route exact path="/quizzes" component={Quizzes} />
            <Route exact path="/quizzes/:quiz" component={Quiz} />
        </Switch>
    );
}