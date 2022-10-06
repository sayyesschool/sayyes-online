import { Dialog } from '@fluentui/react-northstar';

import Icon from 'shared/ui-components/icon';

export default function ErrorDialog({ error = {}, onClose }) {
    return (
        <Dialog
            open={error !== null}
            header="Ошибка"
            headerAction={{
                icon: <Icon name="close" />,
                title: 'Закрыть',
                onClick: onClose
            }}
            content={error && <>
                {getMessage(error)}

                {Boolean(error.code) && (
                    <pre>
                        <code>Error Code: {error.code}</code>
                    </pre>
                )}
            </>}
        />
    );
}

function getMessage({ code, message = '' }) {
    switch (code) {
        case 20101: // Invalid token error
            return message + '. Please make sure you are using the correct credentials.';
        default:
            return message;
    }
}