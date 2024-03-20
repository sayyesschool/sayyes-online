import { SyncClient } from 'twilio-sync';
import { connect, createLocalVideoTrack, LocalDataTrack } from 'twilio-video';

export function getSyncClient(identity) {
    return fetch(`/api/twilio/tokens/sync?identity=${identity}}`)
        .then(res => res.json())
        .then(res => new SyncClient(res.data.token));
}