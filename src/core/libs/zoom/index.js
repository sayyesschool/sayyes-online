const crypto = require('crypto');
const request = require('request');
const jwt = require('jsonwebtoken');

const meetings = require('./meetings')(zoomRequest);
const users = require('./users')(zoomRequest);

const ZOOM_API_URL = 'https://api.zoom.us/v2/';

module.exports = ({ ZOOM_API_KEY, ZOOM_API_SECRET }) => {
    return {
        generateSignature: (meetingNumber, role = 0) => {
            const time = Date.now() - 1000;
            const data = Buffer.from(`${ZOOM_API_KEY}${meetingNumber}${time}${role}`).toString('base64');
            const hash = crypto.createHmac('sha256', ZOOM_API_SECRET).update(data).digest('base64');
            const signature = Buffer.from(`${ZOOM_API_KEY}.${meetingNumber}.${time}.${role}.${hash}`).toString('base64');

            return encodeURI(signature.replace('=', ''));
        },

        meetings,
        users
    };
};

function getToken() {
    return jwt.sign({
        iss: ZOOM_API_KEY,
        exp: Math.floor(Date.now() / 1000) + 60
    }, ZOOM_API_SECRET);
}

function zoomRequest({ path, method = 'GET', body }) {
    return new Promise((resolve, reject) => {
        request({
            url: `${ZOOM_API_URL}${path}`,
            method,
            auth: {
                bearer: getToken()
            },
            json: true,
            body
        }, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}