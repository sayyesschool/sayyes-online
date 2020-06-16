module.exports = request => ({
    create: ({ email, firstname: first_name, lastname: last_name, type = 1 }) => {
        if (!email) return Promise.reject('Email is required to create a user on Zoom');

        return request({
            path: '/users',
            method: 'POST',
            body: {
                action: 'create',
                user_info: {
                    email,
                    first_name,
                    last_name,
                    type
                }
            }
        });
    },

    list: options => {
        return request({
            path: '/users',
            method: 'GET'
        });
    },

    get: (userId, options) => {
        return request({
            path: `/users/${userId}`,
            method: 'GET'
        });
    },

    user: userId => ({
        activate() {
            return request({
                path: `/users/${userId}/status`,
                method: 'PUT',
                body: {
                    action: 'activate'
                }
            });
        },
    
        deactivate() {
            return request({
                path: `/users/${userId}/status`,
                method: 'PUT',
                body: {
                    action: 'deactivate'
                }
            });
        }
    })
});