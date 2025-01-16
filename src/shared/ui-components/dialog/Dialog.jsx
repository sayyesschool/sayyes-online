import { isValidElement } from 'react';

import DialogActions from '@mui/joy/DialogActions';
import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import classnames from 'classnames';

import Button from '../button/Button';

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
    titleProps,
    contentProps,
    actionsProps,
    sx,
    onClose,

    children = content,
    className,
    ...props
}) {
    const classNames = classnames('ui-Dialog', {
        'ui-Dialog--scrollable': scrollableContent
    }, className);

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
                {title &&
                    <DialogTitle className="ui-Dialog__title" {...titleProps}>
                        {title}
                    </DialogTitle>
                }

                <DialogContent className="ui-Dialog__content" {...contentProps}>
                    {scrollableContent ?
                        <div className="ui-Dialog__scroller">
                            {children}
                        </div>
                        :
                        children
                    }
                </DialogContent>

                {isValidElement(actions) ? actions : (Array.isArray(actions) &&
                    <DialogActions className="ui-Dialog__actions" {...actionsProps}>
                        {actions?.map(action =>
                            isValidElement(action) ?
                                action :
                                <Button
                                    key={action.key}
                                    {...action}
                                />
                        )}
                    </DialogActions>
                )}

                {closable &&
                    <ModalClose size="sm" />
                }
            </ModalDialog>
        </Modal>
    );
}