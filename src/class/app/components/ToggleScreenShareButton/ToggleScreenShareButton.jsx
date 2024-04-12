import { IconButton, Tooltip } from 'shared/ui-components';

import useRoomContext from 'class/hooks/useRoomContext';

export const SCREEN_SHARE_TEXT = 'Показать экран';
export const STOP_SCREEN_SHARE_TEXT = 'Остановить показ экрана';
export const SHARE_IN_PROGRESS_TEXT = 'Нельзя показать экран во время показа экрана другим пользователем';
export const SHARE_NOT_SUPPORTED_TEXT = 'Показ экрана не поддерживается в этом браузере';

export default function ToggleScreenShareButton({ disabled }) {
    const { screenShareParticipant, isSharingScreen, toggleScreenShare } = useRoomContext();

    const isScreenShareSupported = navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;
    const disableScreenShareButton = Boolean(screenShareParticipant);
    const isDisabled = disabled || !isScreenShareSupported;

    let tooltipMessage = '';

    if (!isScreenShareSupported) {
        tooltipMessage = SHARE_NOT_SUPPORTED_TEXT;
    } else if (isSharingScreen) {
        tooltipMessage = STOP_SCREEN_SHARE_TEXT;
    } else if (disableScreenShareButton) {
        tooltipMessage = SHARE_IN_PROGRESS_TEXT;
    } else {
        tooltipMessage = SCREEN_SHARE_TEXT;
    }

    return (
        <Tooltip
            content={tooltipMessage}
            style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
        >
            <IconButton
                icon={isSharingScreen ? 'stop_screen_share' : 'screen_share'}
                color={isSharingScreen ? 'primary' : 'neutral'}
                variant={isSharingScreen ? 'soft' : 'plain'}
                size="sm"
                disabled={isDisabled}
                onClick={toggleScreenShare}
            />
        </Tooltip>
    );
}