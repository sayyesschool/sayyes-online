export default request => ({
    list: () => request({
        path: '/users/UuLuEyiQTAa1U-U-NgRHOA/webinars',
        method: 'GET'
    }),

    registerUser: (webinarId, user) => request({
        path: `webinars/${webinarId}/participants`,
        method: 'POST',
        body: {
            email: user.email,
            first_name: user.firstname,
            last_name: user.lastname
        }
    }),

    unregisterUser: (webinarId, registrantId) => request({
        path: `webinars/${webinarId}/registrants/status`,
        method: 'PUT',
        body: {
            action: 'cancel',
            registrants: [{ id: registrantId }]
        }
    })
});