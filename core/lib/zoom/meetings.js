module.exports = request => ({
    list: () => {
        return request({
            path: '/meetings',
            method: 'GET'
        });
    },

    create: data => {
        return request({
            path: '/users/cmmdBvd_To2ccctk8P482w/meetings',
            method: 'POST',
            body: data
        });
    },

    get: (meetingId, options) => {
        return request({
            path: `/meetings/${meetingId}`,
            method: 'GET'
        });
    },

    update: (meetingId, data, options) => {
        return request({
            path: `/meetings/${meetingId}`,
            method: 'PATCH',
            body: data
        });
    },

    updateStatus: meetingId => {
        return request({
            path: `/meetings/${meetingId}`,
            method: 'PATCH',
            body: {
                action: 'end'
            }
        });
    },

    delete: (meetingId, options) => {
        return request({
            path: `/meetings/${meetingId}`,
            method: 'DELETE'
        });
    }
});