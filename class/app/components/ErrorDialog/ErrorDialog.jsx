import React from 'react';
import {
    Button,
    Dialog
} from 'mdc-react';

import enhanceMessage from './enhanceMessage';

function ErrorDialog({ error, onClose }) {
    const { message, code } = error || {};
    const enhancedMessage = enhanceMessage(message, code);

    return (
        <Dialog open={error !== null} onClose={() => dismissError()}>
            <Dialog.Title>ERROR</Dialog.Title>

            <Dialog.Content>
                {enhancedMessage}

                {Boolean(code) && (
                    <pre>
                        <code>Error Code: {code}</code>
                    </pre>
                )}
            </Dialog.Content>

            <Dialog.Actions>
                <Button onClick={onClose} autoFocus>
                    OK
                </Button>
            </Dialog.Actions>
        </Dialog>
    );
}

export default ErrorDialog;
