import React from 'react';
import {
    DefaultButton,
    PrimaryButton,
    Dialog, DialogFooter
} from '@fluentui/react';

export default function FormDialog({ title, form, isOpen, children, onDismiss, ...props }) {
    return (
        <Dialog
            dialogContentProps={{ title }}
            hidden={!isOpen}
            {...props}
        >
            {children}

            <DialogFooter>
                <DefaultButton type="button" onClick={onDismiss}>Закрыть</DefaultButton>
                <PrimaryButton type="submit" form={form}>Сохранить</PrimaryButton>
            </DialogFooter>
        </Dialog>
    );
}