export const GET_QUIZZES = 'GET_QUIZZES';
export const GET_QUIZ = 'GET_QUIZ';
export const UNSET_QUIZ = 'UNSET_QUIZ';
export const COMMIT_ANSWER = 'COMMIT_ANSWER';
export const END_QUIZ = 'END_QUIZ';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_QUIZZES:
            return {
                ...state,
                list: action.quizzes
            };

        case GET_QUIZ:
            return {
                ...state,
                single: {
                    ...state.single,
                    ...action.quiz,
                    loading: false
                }
            };

        case UNSET_QUIZ:
            return {
                ...state,
                single: undefined
            };

        case COMMIT_ANSWER:
            return {
                ...state,
                single: {
                    ...state.single,
                    answers: [...state.single.answers, action.answer],
                    currentQuestionIndex: state.single.currentQuestionIndex + 1
                }
            };

        default:
            return state;
    }
}

export function getQuizzes() {
    return {
        type: GET_QUIZZES,
        request: {
            method: 'get',
            url: '/quizzes'
        }
    };
}

export function getQuiz(slug) {
    return {
        type: GET_QUIZ,
        request: {
            method: 'get',
            url: `/quizzes/${slug}`
        }
    };
}

export function unsetQuiz() {
    return {
        type: UNSET_QUIZ
    };
}

export function commitAnswer(answer) {
    return {
        type: COMMIT_ANSWER,
        answer
    };
}

export function endQuiz(quiz) {
    return {
        type: END_QUIZ,
        request: {
            method: 'post',
            url: `/quizzes/${quiz.slug}`,
            body: {
                answers: quiz.answers
            }
        }
    };
}

export const types = {
    GET_QUIZZES,
    GET_QUIZ,
    UNSET_QUIZ,
    COMMIT_ANSWER,
    END_QUIZ
};

export const actions = {
    getQuizzes,
    getQuiz,
    unsetQuiz,
    commitAnswer,
    endQuiz
};