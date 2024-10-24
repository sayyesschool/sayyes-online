import { Dialog } from 'shared/ui-components';

export default function LexemeModal({
    children,
    open,
    onClose
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            {children}
        </Dialog>
    );
}