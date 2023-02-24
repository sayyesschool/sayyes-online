module.exports = request => ({
    list: () => request({
        path: '/meetings',
        method: 'GET'
    }),

    create: data => request({
        path: '/users/me/meetings',
        method: 'POST',
        body: data
    }),

    get: (meetingId, options) => request({
        path: `/meetings/${meetingId}`,
        method: 'GET'
    }),

    update: (meetingId, data, options) => request({
        path: `/meetings/${meetingId}`,
        method: 'PATCH',
        body: data
    }),

    updateStatus: meetingId => request({
        path: `/meetings/${meetingId}`,
        method: 'PATCH',
        body: {
            action: 'end'
        }
    }),

    delete: (meetingId, options) => request({
        path: `/meetings/${meetingId}`,
        method: 'DELETE'
    }),

    addRegistrant: (meetingId, body) => request({
        path: `meetings/${meetingId}/registrants`,
        method: 'POST',
        body
    }),

    removeRegistrant: (meetingId, registrantId) => request({
        path: `meetings/${meetingId}/registrants/status`,
        method: 'PUT',
        body: {
            action: 'cancel',
            registrants: [{ id: registrantId }]
        }
    }),

    updateRegistrantStatus: (meetingId, data) => request({
        path: `meetings/${meetingId}/registrants/status`,
        method: 'PUT',
        body: {
            action: data.action,
            registrants: data.registrants
        }
    })
});