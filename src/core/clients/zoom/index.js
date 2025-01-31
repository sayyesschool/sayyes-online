import { createHmac } from 'node:crypto';

import { getToken } from './auth';
import { ZOOM_API_URL } from './constants';
import Meetings from './meetings';

export default ({ accountId, clientId, clientSecret, userId }) => {
    let token;

    async function refreshToken() {
        token = await getToken(accountId, clientId, clientSecret);
    }

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
            const error = await response.json();

            if (error.code === 124) { // Token expired
                await refreshToken();

                return zoomRequest({ path, method, body });
            }

            throw new Error(error ? `${error.message} (Code: ${error.code})` : `ZOOM API error. Code ${response.status}`);
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

    if (!token) {
        refreshToken();
    }

    return {
        meetings,

        generateSignature(meetingNumber, role = 0) {
            const time = Date.now() - 1000;
            const data = Buffer.from(`${clientId}${meetingNumber}${time}${role}`).toString('base64');
            const hash = createHmac('sha256', clientSecret).update(data).digest('base64');
            const signature = Buffer.from(`${clientId}.${meetingNumber}.${time}.${role}.${hash}`).toString('base64');

            return encodeURI(signature.replace('=', ''));
        }
    };
};