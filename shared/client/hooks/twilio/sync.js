import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SyncClient } from 'twilio-sync';

export function useSync(token) {
    const clientRef = useRef();

    useEffect(() => {
        const client = new SyncClient(token);

        client.on('connectionStateChanged', state => {
            // if (state === 'connected') {
            //     component.client  = client;
            //     component.setState({status:'connected'});
            //     component.loadFormData();
            //     component.subscribeToParticipantsUpdates();
            //     component.addParticipant(identity);
            // } else {
            //   component.setState({
            //     status:'error', 
            //     errorMessage:`Error: expected connected status but got ${state}`
            //   });
            // }
        });

        // client.on('tokenAboutToExpire', function() {
        //     var token = '<your-access-token-here>';
        //     syncClient.updateToken(token);
        // });

        // client.on('tokenExpired', function() {
        //     var token = '<your-access-token-here>';
        //     syncClient.updateToken(token);
        // });

        clientRef.current = client;

        return () => clientRef.current?.shutdown();
    }, [token]);

    return clientRef;
}

export function useSyncDoc(token, docId) {
    const syncRef = useSync(token);
    const docRef = useRef();
    const [data, setData] = useState(null);

    useEffect(() => {
        syncRef.current?.document(docId).then(doc => {
            docRef.current = doc;
            setData(doc.data);
            doc.mutate(() => ({}));
            doc.on('updated', data => {
                setData(data.data);
            });
        });

        return () => {
            docRef.current?.removeAllListeners();
            docRef.current?.close();
        };
    }, []);

    const updateDoc = useCallback(data => {
        docRef.current?.set(data);
    }, []);

    const clearDoc = useCallback(() => {
        docRef.current?.set({});
    }, []);

    return {
        data,
        updateDoc,
        clearDoc
    };
}