import { mock, noopAsync } from 'test/helpers';

export default {
    put: mock.fn(noopAsync),
    delete: mock.fn(noopAsync)
};