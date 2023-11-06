import { useCallback } from 'react';

import { Button } from 'shared/ui-components';

import useSharedState from 'app/hooks/useSharedState';

export default function MiroWhiteboard() {
    const sharedState = useSharedState();

    const handleOpenWhiteboard = useCallback(() => {
        window.miroBoardsPicker.open({
            clientId: window.MIRO_CLIENT_ID,
            action: 'access-link',
            allowCreateAnonymousBoards: true,
            getToken: () => Promise.resolve(window.MIRO_TOKEN),
            success: function(result) {
                sharedState.updateDoc({
                    board: result
                });
            }
        });
        // miroBoardsPicker.open({
        //     clientId: window.MIRO_CLIENT_ID,
        //     action: 'select',
        //     success: result => {
        //         sharedState.updateDoc({
        //             board: result
        //         });
        //     }
        // });
    }, []);

    const board = sharedState?.data?.board;

    console.log('Board', sharedState, board);

    return (
        <div className="MiroWhiteboard">
            {board &&
                <iframe
                    key={board.id}
                    width="768"
                    height="432"
                    src={`https://miro.com/app/live-embed/${board.id}/?moveToViewport=-23165,-5837,13803,7546&embedAutoplay=true`}
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                />
            }

            <Button
                content={board ? 'Открыть другую доску' : 'Открыть доску'}
                onClick={handleOpenWhiteboard}
            />
        </div>
    );
}