const GET_USERS = 'GET_USERS';
const GET_USER = 'GET_USER';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';

export default function reducer(state = null, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                list: action.data
            };

        case GET_USER:
            return {
                ...state,
                single: action.data
            };

        case CREATE_USER:
            return {
                ...state,
                list: [...state.list, action.data]
            };

        case UPDATE_USER:
            return {
                ...state,
                single: action.data
            };

        case DELETE_USER:
        default:
            return state;
    }
}

export function getUsers(query) {
    return {
        type: GET_USERS,
        request: {
            method: 'get',
            url: '/users' + (query ? ('?' + query) : '')
        }
    };
}

export function getUser(id) {
    return {
        type: GET_USERS,
        request: {
            method: 'get',
            url: `/users/${id}`
        }
    };
}

export function createUser(data) {
    return {
        type: CREATE_USER,
        request: {
            method: 'post',
            url: '/users',
            body: data
        }
    };
}

export function updateUser(id, data) {
    return {
        type: UPDATE_USER,
        request: {
            method: 'put',
            url: `/users/${id}`,
            body: data
        }
    };
}

export function deleteUser(id, data) {
    return {
        type: DELETE_USER,
        request: {
            method: 'put',
            url: `/users/${id}`,
            body: data
        }
    };
}

export const types = {
    GET_USERS,
    GET_USER,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER
};

export const actions = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};