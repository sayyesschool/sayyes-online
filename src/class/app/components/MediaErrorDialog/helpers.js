export function getContent(error, hasAudio, hasVideo) {
    let title = '';
    let message = '';
    let image = '';

    switch (true) {
        case error?.name === 'NotAllowedError':
            // Chrome only
            if (error.message === 'Permission denied by system') {
                title = 'Невозможно получить доступ к медиа';
                message = 'Операционная система заблокировала браузеру доступ к микрофону или камере. Пожалуйста, проверьте настройки вашей операционной системы.';
            }
            // This error occurs when the user closes the dialog box after being asked for permission to use media devices
            if (error.message === 'Permission dismissed') {
                title = 'Не удалось получить доступ к микрофону и камере';
                message = 'Хотите, чтобы другие участники видели и слышали вас? В любой момент микрофон и камеру можно отключить.';
                image = 'media-permissions-intro.svg';
                break;
            }
            if (error.message === 'Permission denied') {
                title = 'Не удалось получить доступ к микрофону и камере';
                message = 'Хотите, чтобы другие участники видели и слышали вас? В любой момент микрофон и камеру можно отключить.';
                image = 'media-permissions-intro.svg';
                break;
            }
            break;

        case error?.message === 'NotAllowedError':
            title = 'Не удалось получить доступ к микрофону и камере';
            message = 'Пожалуйста, предоставьте браузеру разрешение на доступ к микрофону и камере. Для этого нажмите на значок 🔒 в адресной строке браузера и дайте разрешение на использование микрофона и камеры.';
            image = 'media-permissions-allow.svg';
            break;

        case error?.message === 'MicrophonePermissionsDenied':
            title = 'Не удалось получить доступ к микрофону';
            message = 'Пожалуйста, предоставьте браузеру разрешение на доступ к микрофону. Для этого нажмите на значок 🔒 в адресной строке браузера и дайте разрешение на использование микрофона.';
            image = 'media-permissions-allow.svg';
            break;

        case error?.message === 'CameraPermissionsDenied':
            title = 'Не удалось получить доступ к камере';
            message = 'Пожалуйста, предоставьте браузеру разрешение на доступ к камере. Для этого нажмите на значок 🔒 в адресной строке браузера и дайте разрешение на использование камеры.';
            image = 'media-permissions-allow.svg';
            break;

        // This error is emitted when input devices are not connected or disabled in the OS settings
        case error?.name === 'NotFoundError':
            title = 'Не получается найти микрофон или камеру';
            message = 'Браузер не может получить доступ к микрофону или камере. Убедитесь, что все устройства ввода подключены и включены.';
            break;

        // Other getUserMedia errors are less likely to happen in this app. Here we will display
        // the system's error message directly to the user.
        case Boolean(error):
            title = 'Не удалось получить доступ к камере и/или микрофону.';
            message = `${error.name} ${error.message}`;
            break;

        case !hasAudio && !hasVideo:
            title = 'Камера или микрофон не обнаружены';
            message = 'Другие участники не смогут вас видеть и/или слышать.';
            break;

        case !hasVideo:
            title = 'Камера не обнаружена';
            message = 'Другие участники не смогут вас видеть.';
            break;

        case !hasAudio:
            title = 'Микрофон не обнаружен';
            message = 'Другие участники не смогут вас слышать.';
    }

    return {
        title,
        message,
        image
    };
}