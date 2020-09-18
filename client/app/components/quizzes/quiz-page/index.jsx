import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    Avatar,
    Icon,
    Typography
} from '@codedojo/mdc-react';

import * as actions from 'store/quizzes/actions';

import LoadingIndicator from 'components/shared/LoadingIndicator';
import AppContent from 'components/shared/AppContent';
import AppHeader from 'components/shared/AppHeader';
import Page from 'components/shared/Page';
import PageHeader from 'components/shared/PageHeader';
import PageContent from 'components/shared/PageContent';

import QuizContent from '../../components/QuizContent';

import './index.scss';

class Quiz extends React.Component {
    componentDidMount() {
        this.props.actions.getQuiz(this.props.match.params.quiz);
    }

    componentWillUnmount() {
        this.props.actions.unsetQuiz();
    }

    handleAnswer = answer => {
        this.props.actions.commitAnswer(answer);
    };

    handleComplete = () => {
        this.props.actions.endQuiz(this.props.quiz);
    };

    render() {
        const { quiz, question, questionPosition, numberOfQuestions, hasNextQuestion, quizProgress, actions } = this.props;

        if (quiz.loading) return <LoadingIndicator />;
        
        return (
            <AppContent className={`theme-${quiz.topic.id}`}>
                <AppHeader
                    title={quiz.title}
                    fixed
                    navigationIcon={
                        <Icon element={Link} to={'/quizzes'}>arrow_back</Icon>
                    }
                />

                <Page id="quiz-page" title={quiz.title}>
                    <PageHeader pullContent>
                        <Avatar src={quiz.topic.image} large />

                        <Typography variant="headline4">{quiz.title}</Typography>
                    </PageHeader>

                    <PageContent>
                        <QuizContent
                            quiz={quiz}
                            question={question}
                            questionPosition={questionPosition}
                            numberOfQuestions={numberOfQuestions}
                            hasNextQuestion={hasNextQuestion}
                            progress={quizProgress}
                            onAnswer={actions.commitAnswer}
                            onComplete={this.handleComplete}
                        />
                    </PageContent>
                </Page>
            </AppContent>
        );
    }
}

export default connect(
    state => {
        const quiz = state.quizzes.single;
        
        if (quiz.loading) return { quiz };
        
        const numberOfQuestions = quiz.questions.length;
        const question = quiz.questions[quiz.currentQuestionIndex];
        const questionPosition = quiz.currentQuestionIndex + 1;
        const hasNextQuestion = quiz.currentQuestionIndex < quiz.questions.length;
        const quizProgress = quiz.currentQuestionIndex / numberOfQuestions * 100;
        
        return {
            quiz,
            question,
            questionPosition,
            numberOfQuestions,
            hasNextQuestion,
            quizProgress
        };
    },

    dispatch => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(Quiz);