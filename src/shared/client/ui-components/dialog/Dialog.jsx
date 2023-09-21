import { isValidElement } from 'react';
import classnames from 'classnames';

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
    scrollableContent = true,
    closable = true,
    sx,
    onClose,

    children = content,
    className,
    ...props
}) {
    const classNames = classnames(className, 'ui-Dialog', {
        'ui-Dialog--scrollable': scrollableContent
    });

    return (
        <Modal
            className={classNames}
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
                {closable &&
                    <ModalClose size="sm" />
                }

                {title &&
                    <Heading className="ui-Dialog__title" type="h5" content={title} />
                }

                <div className="ui-Dialog__content">
                    {children}
                </div>

                {isValidElement(actions) ? actions : (Array.isArray(actions) &&
                    <Flex gap="smaller" justifyContent="flex-end">
                        {actions?.map(action => isValidElement(action) ? action :
                            <Button {...action} />
                        )}
                    </Flex>
                )}
            </ModalDialog>
        </Modal>
    );
}