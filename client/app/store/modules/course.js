export const GET_COURSE = 'GET_COURSE';

export default function reducer(state = null, action) {
    switch (action.type) {
        case GET_COURSE:
            return action.data;

        default:
            return state;
    }
}

export function getCourse(id) {
    return {
        type: GET_COURSE,
        request: {
            method: 'get',
            url: `/courses/${id}`
        }
    };
}

export const types = {
    GET_COURSE
};

export const actions = {
    getCourse
};