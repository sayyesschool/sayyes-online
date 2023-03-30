import { isValidElement } from 'react';

import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';

import Box from '../box/Box';
import Button from '../button/Button';
import Flex from '../flex/Flex';
import Heading from '../heading/Heading';

export default function Dialog({
    title,
    content,
    actions,
    open,
    color,
    layout,
    size,
    variant,
    withCloseButton = true,
    sx,
    onClose,

    children = content,
    ...props
}) {
    return (
        <Modal
            className="ui-Dialog"
            open={open}
            onClose={onClose}
            {...props}
        >
            <ModalDialog
                color={color}
                layout={layout}
                size={size}
                variant={variant}
                sx={sx}
            >
                {withCloseButton &&
                    <ModalClose size="sm" />
                }

                {title &&
                    <Heading type="h5" content={title} />
                }

                <Box sx={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    margin: '.75rem 0'
                }}>
                    {children}
                </Box>

                <Flex gap="smaller">
                    {actions?.map(action => isValidElement(action) ? action :
                        <Button {...action} />
                    )}
                </Flex>
            </ModalDialog>
        </Modal>
    );
}