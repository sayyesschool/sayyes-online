export const GET_LESSONS = 'GET_LESSONS';
export const GET_LESSON = 'GET_LESSON';
export const CREATE_LESSON = 'CREATE_LESSON';
export const UPDATE_LESSON = 'UPDATE_LESSON';
export const DELETE_LESSON = 'DELETE_LESSON';

export default function reducer(state = null, action) {
    switch (action.type) {
        case GET_LESSONS:
            return {
                ...state,
                list: action.data.lessons
            };

        case GET_LESSON:
            return {
                ...state,
                single: action.data.lesson
            };

        case CREATE_LESSON:
            return {
                ...state,
                list: [...state.list, action.data.lesson]
            };

        case UPDATE_LESSON:
            return {
                list: state.list.map(lesson => lesson.id === action.data.lesson.id ? ({ ...lesson, ...action.data.lesson }) : lesson),
                single: {
                    ...state.single,
                    ...action.data.lesson
                }
            };

        case DELETE_LESSON:
            return {
                list: state.list.filter(lesson => lesson.id !== action.lessonId),
                single: null
            };

        default:
            return state;
    }
}

export function getLessons(params = {}) {
    const query = Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&');

    return {
        type: GET_LESSONS,
        request: {
            method: 'get',
            url: '/lessons' + (query ? `?${query}` : '')
        }
    };
}

export function getLesson(lessonId) {
    return {
        type: GET_LESSON,
        request: {
            method: 'get',
            url: `/lessons/${lessonId}`
        }
    };
}

export function createLesson(data) {
    return {
        type: CREATE_LESSON,
        request: {
            method: 'post',
            url: '/lessons',
            body: data
        }
    };
}

export function updateLesson(id, data) {
    return {
        type: UPDATE_LESSON,
        request: {
            method: 'put',
            url: `/lessons/${id}`,
            body: data
        }
    };
}

export function deleteLesson(id) {
    return {
        type: DELETE_LESSON,
        request: {
            method: 'delete',
            url: `/lessons/${id}`
        }
    };
}

export const types = {
    GET_LESSONS,
    GET_LESSON,
    CREATE_LESSON,
    UPDATE_LESSON,
    DELETE_LESSON
};

export const actions = {
    getLessons,
    getLesson,
    createLesson,
    updateLesson,
    deleteLesson
};