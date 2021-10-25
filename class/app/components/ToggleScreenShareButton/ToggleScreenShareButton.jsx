import {
    IconButton,
    Tooltip
} from 'mdc-react';

import useRoomContext from 'app/hooks/useRoomContext';
import useScreenShareParticipant from 'app/hooks/useScreenShareParticipant';

export const SCREEN_SHARE_TEXT = 'Показать экран';
export const STOP_SCREEN_SHARE_TEXT = 'Остановить показ экрана';
export const SHARE_IN_PROGRESS_TEXT = 'Нельзя показать экран во время показа экрана другим пользователем';
export const SHARE_NOT_SUPPORTED_TEXT = 'Показ экрана не поддерживается в этом браузере';

export default function ToggleScreenShareButton({ disabled }) {
    const { isSharingScreen, toggleScreenShare } = useRoomContext();
    const screenShareParticipant = useScreenShareParticipant();

    const isScreenShareSupported = navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;
    const disableScreenShareButton = Boolean(screenShareParticipant);
    const isDisabled = disabled || disableScreenShareButton || !isScreenShareSupported;

    let tooltipMessage = '';

    if (!isScreenShareSupported) {
        tooltipMessage = SHARE_NOT_SUPPORTED_TEXT;
    } else if (disableScreenShareButton) {
        tooltipMessage = SHARE_IN_PROGRESS_TEXT;
    } else if (isSharingScreen) {
        tooltipMessage = STOP_SCREEN_SHARE_TEXT;
    } else {
        tooltipMessage = SCREEN_SHARE_TEXT;
    }

    return (
        <Tooltip
            label={tooltipMessage}
            style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
        >
            <span>
                <IconButton
                    icon={isSharingScreen ? 'stop_screen_share' : 'screen_share'}
                    disabled={isDisabled}
                    onClick={toggleScreenShare}
                />
            </span>
        </Tooltip>
    );
}