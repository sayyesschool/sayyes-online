import { mock, spy } from '../helpers';

import { addRegistrant, createMeeting, getMeeting } from './data.js';

async function noopAsync() {}

export default {
    init: mock.fn(noopAsync),
    refreshToken: mock.fn(noopAsync),
    generateSignature: mock.fn(noopAsync),
    meetings: {
        get: mock.fn(noopAsync, async () => getMeeting),
        create: mock.fn(noopAsync, async () => createMeeting),
        update: mock.fn(noopAsync, async () => {}),
        updateStatus: mock.fn(noopAsync, async () => {}),
        delete: mock.fn(noopAsync, async () => {}),
        addRegistrant: spy(noopAsync).andReturn(Promise.resolve(addRegistrant)),
        removeRegistrant: spy(noopAsync, async () => {}),
        updateRegistrantStatus: spy(noopAsync, async () => {})
    }
};