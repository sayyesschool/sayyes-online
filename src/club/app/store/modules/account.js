import { REGISTER_FOR_MEETING, UNREGISTER_FROM_MEETING } from 'app/store/modules/meetings';

export const GET_ACCOUNT = 'GET_ACCOUNT';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

export const actions = {
    GET_ACCOUNT,
    UPDATE_PROFILE,
    UPDATE_PASSWORD
};

export function getAccount() {
    return {
        type: GET_ACCOUNT,
        request: {
            method: 'get',
            url: '/account'
        }
    };
}

export function updateProfile(data) {
    return {
        type: UPDATE_PROFILE,
        request: {
            method: 'put',
            url: '/account/profile',
            body: data
        }
    };
}

export function updatePassword(data) {
    return {
        type: UPDATE_PASSWORD,
        request: {
            method: 'put',
            url: '/account/password',
            body: data
        }
    };
}

export const actionCreators = {
    getAccount,
    updateProfile,
    updatePassword
};

export default function reducer(state = null, action) {
    switch (action.type) {
        case GET_ACCOUNT:
        case UPDATE_PROFILE:
            return action.data;

        case REGISTER_FOR_MEETING:
        case UNREGISTER_FROM_MEETING:
            return {
                ...state,
                balance: action.data.balance
            };

        default:
            return state;
    }
}