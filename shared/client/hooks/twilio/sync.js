import { useRef, useEffect } from 'react';
import { SyncClient } from 'twilio-sync';

export function useSync(identity) {
    const clientRef = useRef();

    useEffect(() => {
        if (!identity) return;

        fetch(`/api/twilio/tokens/sync?identity=${identity}}`)
            .then(res => res.json())
            .then(res => {
                const client = new SyncClient(res.data.token);

                // client.on('tokenAboutToExpire', function() {
                //     // Obtain a JWT access token: https://www.twilio.com/docs/sync/identity-and-access-tokens
                //     var token = '<your-access-token-here>';
                //     syncClient.updateToken(token);
                // });

                clientRef.current = client;
            });

        return () => clientRef.current?.shutdown();
    }, []);

    return clientRef;
}