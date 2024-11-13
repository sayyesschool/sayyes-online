import { createHmac } from 'node:crypto';

import { getToken } from './auth';
import { ZOOM_API_URL } from './constants';
import Meetings from './meetings';

export default ({ accountId, clientId, clientSecret, userId }) => {
    let token;

    async function zoomRequest({ path, method = 'GET', body }) {
        const response = await fetch(`${ZOOM_API_URL}${path}`, {
            method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const contentLength = response.headers.get('Content-Length');

        if (contentLength && parseInt(contentLength) > 0) {
            if (response.headers.get('Content-Type').includes('application/json')) {
                return response.json();
            } else {
                return response.text();
            }
        } else {
            return undefined;
        }
    }

    const meetings = Meetings(userId, zoomRequest);

    return {
        meetings,

        async init() {
            if (!token) {
                token = await getToken(accountId, clientId, clientSecret);
            }
        },

        async refreshToken() {
            token = await getToken(accountId, clientId, clientSecret);

            return token;
        },

        generateSignature(meetingNumber, role = 0) {
            const time = Date.now() - 1000;
            const data = Buffer.from(`${clientId}${meetingNumber}${time}${role}`).toString('base64');
            const hash = createHmac('sha256', clientSecret).update(data).digest('base64');
            const signature = Buffer.from(`${clientId}.${meetingNumber}.${time}.${role}.${hash}`).toString('base64');

            return encodeURI(signature.replace('=', ''));
        }
    };
};