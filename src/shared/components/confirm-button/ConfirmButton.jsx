import { useState } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import { Button, IconButton } from 'shared/ui-components';

export default function ConfirmButton({
    content,
    icon,
    message = 'Подтвердите действие',
    description,
    closeAfterConfirm,
    onConfirm,
    onCancel,
    ...props
}) {
    const [isDialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            {icon && !content ?
                <IconButton
                    icon={icon}
                    onClick={() => setDialogOpen(true)}
                    {...props}
                /> :
                <Button
                    content={content}
                    icon={icon}
                    onClick={() => setDialogOpen(true)}
                    {...props}
                />
            }

            <ConfirmationDialog
                title={message}
                message={description}
                open={isDialogOpen}
                closeAfterConfirm={closeAfterConfirm}
                onConfirm={onConfirm}
                onClose={() => setDialogOpen(false)}
            />
        </>
    );
}