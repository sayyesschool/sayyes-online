import axios from 'axios';
import qs from 'querystring';

import { ZOOM_OAUTH_ENDPOINT } from './constants';

export async function getToken(accountId, clientId, clientSecret) {
    try {
        const request = await axios.post(
            ZOOM_OAUTH_ENDPOINT,
            qs.stringify({ grant_type: 'account_credentials', account_id: accountId }),
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
                }
            }
        );

        const {
            access_token: accessToken,
            expires_in: expiresIn
        } = request.data;

        return {
            value: accessToken,
            expiresIn: expiresIn,

            [Symbol.toPrimitive]() {
                return this.value;
            },

            [Symbol.toStringTag]() {
                return this.value;
            }
        };
    } catch (error) {
        throw new Error('Failed to get Zoom token', error.message);
    }
}