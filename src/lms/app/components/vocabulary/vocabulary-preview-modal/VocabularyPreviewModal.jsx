import { Dialog } from 'shared/ui-components';

import LexemeView from 'lms/components/vocabulary/lexeme-view';

export default function VocabularyPreviewModal({
    lexeme,
    open,
    onClose
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <LexemeView lexeme={lexeme} />
        </Dialog>
    );
}