export const GET_USER = 'GET_USER';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

export default function reducer(state = null, action) {
    switch (action.type) {
        case GET_USER:
        case UPDATE_PROFILE:
            return action.data;

        default:
            return state;
    }
}

export const actions = {
    getUser,
    updateProfile,
    updatePassword
};

export function getUser() {
    return {
        type: GET_USER,
        request: {
            method: 'get',
            url: '/user'
        }
    };
}

export function updateProfile(data) {
    return {
        type: UPDATE_PROFILE,
        request: {
            method: 'put',
            url: '/user/profile',
            body: data
        }
    };
}

export function updatePassword(data) {
    return {
        type: UPDATE_PASSWORD,
        request: {
            method: 'put',
            url: '/user/password',
            body: data
        }
    };
}