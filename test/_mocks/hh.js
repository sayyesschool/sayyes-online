import { spy } from 'test/helpers';

export default {
    addStudyRequest: spy(async () => ({
        Id: 1
    })).andCallThrough()
};