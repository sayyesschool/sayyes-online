import { REQUESTS } from 'test/_data';
import { models } from 'test/_env';

import api from './api';

const { Request } = models;

describe('CRM Requests API', () => {
    describe('GET /export', () => {
        it('should return requests as CSV', async () => {
            await Request.create(REQUESTS);

            await api.get('/requests/export')
                .expect('Content-Type', /text\/csv/);
        });
    });
});