import { spy } from 'test/helpers';

export default {
    verify: spy(async () => ({
        success: true,
        score: 0.9
    })).andCallThrough()
};