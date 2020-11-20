const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

const initialState = {
    active: false,
    type: '',
    text: ''
};

export function showNotification(text, type) {
    return {
        type: SHOW_NOTIFICATION,
        notification: { active: true, type, text }
    };
}

export function hideNotification() {
    return {
        type: HIDE_NOTIFICATION
    };
}

export const actions = {
    showNotification,
    hideNotification
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return action.notification;

        case HIDE_NOTIFICATION:
            return {
                ...state,
                active: false
            };

        default: return state;
    }
}