import { combineReducers, createAction, createReducer } from 'shared/store/helpers';

import { createAssignment, deleteAssignment, updateAssignment } from './assignments';
import { createComment, deleteComment, updateComment } from './comments';
import { createLesson, createLessons, deleteLesson, updateLesson } from './lessons';
import { createPayment, deletePayment, updatePayment } from './payments';

export const getEnrollments = createAction('GET_ENROLLMENTS', () => ({
    request: {
        method: 'get',
        path: 'enrollments'
    }
}));

export const getEnrollment = createAction('GET_ENROLLMENT', id => ({
    request: {
        method: 'get',
        path: `enrollments/${id}`
    }
}));

export const createEnrollment = createAction('CREATE_ENROLLMENT', data => ({
    request: {
        method: 'post',
        path: 'enrollments',
        body: data
    }
}));

export const updateEnrollment = createAction('UPDATE_ENROLLMENT', (id, data) => ({
    request: {
        method: 'put',
        path: `enrollments/${id}`,
        body: data
    }
}));

export const deleteEnrollment = createAction('DELETE_ENROLLMENT', id => ({
    request: {
        method: 'delete',
        path: `enrollments/${id}`
    }
}));

export const payEnrollment = createAction('PAY_ENROLLMENT', (id, data) => ({
    request: {
        method: 'post',
        path: `enrollments/${id}/pay`,
        body: data
    }
}));

export const updateSchedule = createAction('UPDATE_ENROLLMENT_SCHEDULE', (id, data) => ({
    request: {
        method: 'put',
        path: `enrollments/${id}/schedule`,
        body: data
    }
}));

export const actions = {
    getEnrollments,
    getEnrollment,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
    payEnrollment,
    updateSchedule
};

export const enrollmentsReducer = createReducer(null, {
    [getEnrollments]: (state, action) => action.data,
    [createEnrollment]: (state, action) => state?.concat(action.data) || [action.data]
    //[updateEnrollment]: (state, action) => state?.map(e => e.id !== action.data.id ? e : { ...e, ...action.data }),
    //[deleteEnrollment]: (state, action) => state?.filter(e => e.id !== action.data.id)
});

export const enrollmentReducer = createReducer(null, {
    [getEnrollment]: (state, action) => action.data,
    [updateEnrollment]: (state, action) => ({ ...state, ...action.data }),
    [deleteEnrollment]: (state, action) => null,

    // Schedule

    [updateSchedule]: (state, action) => ({ ...state, schedule: action.data.schedule }),

    // Lessons

    [createLessons]: (state, action) => ({
        ...state,
        lessons: state.lessons.concat(...action.data.filter(lesson => lesson.enrollmentId === state.id))
    }),
    [createLesson]: (state, action) => (!state || state.id !== action.data.enrollmentId) ? state : {
        ...state,
        lessons: state.lessons.concat(action.data)
    },
    [updateLesson]: (state, action) => (!state || state?.id !== action.data.enrollmentId) ? state : {
        ...state,
        lessons: state.lessons.map(lesson => lesson.id !== action.data.id ? lesson : {
            ...lesson,
            ...action.data
        })
    },
    [deleteLesson]: (state, action) => (!state || state?.id !== action.data.enrollmentId) ? state : {
        ...state,
        lessons: state.lessons.filter(lesson => lesson.id !== action.data.id)
    },

    // Comment

    [createComment]: (state, action) => state.id !== action.data.ref ? state : {
        ...state,
        comments: [action.data, ...state.comments]
    },
    [updateComment]: (state, action) => state.id !== action.data.ref ? state : {
        ...state,
        comments: state.comments.map(comment => comment.id !== action.data.id ? comment : {
            ...comment,
            ...action.data
        })
    },
    [deleteComment]: (state, action) => state.id !== action.data.ref ? state : {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.data.id)
    },

    // Payments

    [createPayment]: (state, action) => state && state.id === action.data.enrollmentId && {
        ...state,
        payments: [action.data, ...state.payments]
    },
    [updatePayment]: (state, action) => state && state.id === action.data.enrollmentId && {
        ...state,
        payments: state && state.payments.map(payment => payment.id !== action.data.id ? payment : {
            ...payment,
            ...action.data
        })
    },
    [deletePayment]: (state, action) => state && state.id === action.data.enrollmentId && {
        ...state,
        payments: state && state.payments.filter(payment => payment.id !== action.data.id)
    },

    // Assignments

    [createAssignment]: (state, action) => state?.id !== action.data.enrollmentId ? state : {
        ...state,
        assignments: state?.assignments?.concat(action.data)
    },
    [updateAssignment]: (state, action) => state?.id !== action.data.enrollmentId ? state : {
        ...state,
        assignments: state?.assignments?.map(assignment => assignment.id !== action.data.id ? assignment : {
            ...assignment,
            ...action.data
        })
    },
    [deleteAssignment]: (state, action) => state?.id !== action.data.enrollmentId ? state : {
        ...state,
        assignments: state?.assignments?.filter(assignment => assignment.id !== action.data.id)
    }
});

export default combineReducers({
    list: enrollmentsReducer,
    single: enrollmentReducer
});