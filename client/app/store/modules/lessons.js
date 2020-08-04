export const GET_LESSONS = 'GET_LESSONS';

export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_LESSONS:
            return action.data;

        default:
            return state;
    }
}

export function getLessons() {
    return {
        type: GET_LESSONS,
        request: {
            method: 'get',
            url: '/lessons'
        }
    };
}

export const types = {
    GET_LESSONS
};

export const actions = {
    getLessons
};