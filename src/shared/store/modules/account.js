import { createAction } from 'shared/store/helpers';

export const updateProfile = createAction('UPDATE_PROFILE', data => ({
    request: {
        method: 'put',
        path: 'account/profile',
        body: data
    }
}));

export const updateAvatar = createAction('UPDATE_AVATAR', data => ({
    request: {
        method: 'put',
        path: 'account/avatar',
        body: data
    }
}));

export const updatePassword = createAction('UPDATE_PASSWORD', data => ({
    request: {
        method: 'put',
        path: 'account/password',
        body: data
    }
}));

export const actions = {
    updateProfile,
    updateAvatar,
    updatePassword
};