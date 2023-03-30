import { createAction, createReducer } from 'shared/store/helpers';

export const showNotification = createAction('SHOW_NOTIFICATION', data => ({
    notification: {
        active: true,
        type: data.type,
        text: data.text
    }
}));

export const hideNotification = createAction('HIDE_NOTIFICATION');

export const actions = {
    showNotification,
    hideNotification
};

export default createReducer({
    active: false,
    type: '',
    text: ''
}, {
    [showNotification]: (state, action) => ({
        ...state,
        active: true,
        ...action.notification
    }),

    [hideNotification]: (state, action) => ({
        ...state,
        active: false,
        ...action.notification
    })
});