export const GET_ENROLLMENTS = 'GET_ENROLLMENTS';
export const GET_ENROLLMENT = 'GET_ENROLLMENT';

export default function reducer(state = null, action) {
    switch (action.type) {
        case GET_ENROLLMENTS:
            return {
                ...state,
                list: action.data
            };

        case GET_ENROLLMENT:
            return {
                ...state,
                single: action.data
            };

        default:
            return state;
    }
}

export function getEnrollments() {
    return {
        type: GET_ENROLLMENTS,
        request: {
            method: 'get',
            url: '/enrollments'
        }
    };
}

export function getEnrollment(id) {
    return {
        type: GET_ENROLLMENT,
        request: {
            method: 'get',
            url: `/enrollments/${id}`
        }
    };
}

export const types = {
    GET_ENROLLMENTS,
    GET_ENROLLMENT
};

export const actions = {
    getEnrollments,
    getEnrollment
};