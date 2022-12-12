import { useCallback } from 'react';

import { Button } from 'shared/ui-components';
import LoadingIndicator from 'shared/components/loading-indicator';

import useSharedState from 'app/hooks/useSharedState';

import './index.scss';

export default function MiroWhiteboard() {
    const sharedState = useSharedState();

    const handleOpenWhiteboard = useCallback(() => {
        miroBoardsPicker.open({
            clientId: '3458764527308095545',
            action: 'select',
            success: function(result) {
                sharedState.updateDoc({
                    board: result
                });
            }
        });
    }, []);

    const board = sharedState?.data?.board;

    return (
        <div className="miro-whiteboard">
            <Button
                content="Open Whiteboard"
                onClick={handleOpenWhiteboard}
            />

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
        </div>
    );
}