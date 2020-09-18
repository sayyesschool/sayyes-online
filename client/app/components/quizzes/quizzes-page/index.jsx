import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    LayoutGrid, LayoutGridCell,
    LinearProgress
} from '@codedojo/mdc-react';

import * as actions from 'store/quizzes/actions';

import AppContent from 'components/shared/AppContent';
import AppHeader from 'components/shared/AppHeader';
import Page from 'components/shared/Page';
import PageContent from 'components/shared/PageContent';

import QuizCard from '../../components/QuizCard';

class Quizzes extends React.Component {
    componentDidMount() {
        if (this.props.quizzes.length === 0) {
            this.props.actions.getQuizzes();
        }
    }

    render() {
        const { quizzes } = this.props;
        
        return (
            <AppContent>
                <AppHeader
                    title="Тесты"
                    fixed
                />

                <Page id="quizzes-page" title="Тесты">
                    {quizzes.length === 0 && <LinearProgress indeterminate />}

                    <PageContent>
                        <LayoutGrid>
                            {quizzes.map(quiz =>
                                <LayoutGridCell key={quiz.id} span={4}>
                                    <QuizCard quiz={quiz} />
                                </LayoutGridCell>
                            )}
                        </LayoutGrid>
                    </PageContent>
                </Page>
            </AppContent>
        );
    }
}

export default connect(
    state => ({
        quizzes: state.quizzes.list
    }),

    dispatch => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(Quizzes);