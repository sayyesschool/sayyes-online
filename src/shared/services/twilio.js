import { SyncClient } from 'twilio-sync';

export function getSyncClient(identity) {
    return fetch(`/api/twilio/tokens/sync?identity=${identity}}`)
        .then(res => res.json())
        .then(res => new SyncClient(res.data.token));
}