import { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';

import { useAppState } from '../../../../state';

export default function useGetPreflightTokens() {
    const { getToken } = useAppState();
    const [tokens, setTokens] = useState();
    const [tokenError, setTokenError] = useState();
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (!isFetching && !tokens) {
            const roomName = 'preflight-network-test-' + nanoid();

            setIsFetching(true);

            const publisherIdentity = 'participant-' + nanoid();
            const subscriberIdentity = 'participant-' + nanoid();

            Promise.all([getToken(publisherIdentity, roomName), getToken(subscriberIdentity, roomName)])
                .then(tokens => {
                    setTokens(tokens);
                    setIsFetching(false);
                })
                .catch(error => setTokenError(error));
        }
    }, [getToken, isFetching, tokens]);

    return { tokens, tokenError };
}