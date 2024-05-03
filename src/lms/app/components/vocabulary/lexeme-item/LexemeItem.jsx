import { useCallback } from 'react';

import Typography from '@mui/joy/Typography';

import { Checkbox, IconButton, ListItem, Surface } from 'shared/ui-components';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

export default function LexemeItem({ lexeme, userId, handleDeleteLexeme, setCurrentLexeme, toggleEditModalOpen, togglePreviewModalOpen, updateLexemeStatus }) {
    const { id, value, translations, data } = lexeme;
    const translationsString = translations.join(', ');
    const isAuthor = userId !== lexeme?.createdBy;

    const openEditModal = () => {
        toggleEditModalOpen();
        setCurrentLexeme(lexeme);
    };

    const openPreviewModal = () => {
        togglePreviewModalOpen();
        setCurrentLexeme(lexeme);
    };

    const deleteLexeme = () => {
        handleDeleteLexeme(lexeme.id);
    };

    const updateStatus = useCallback(status => {
        return updateLexemeStatus(id, status);
    }, [id, updateLexemeStatus]);

    return (
        <ListItem className="LexemeItem">
            <Checkbox
                checked={false}
                onChange={() => console.log('check')}
            />

            <IconButton
                size="lg"
                variant="plain"
                color="neutral"
                icon="volume_up"
                title='Воспроизвести слово'
                onClick={() => console.log('audio')}
            />

            <Typography className="LexemeItemValue">{value}</Typography>
            —
            <Typography className="LexemeItemTranslation">{translationsString}</Typography>
            <Surface sx={{ background: 'transparent' }} className="LexemeItem__sheet" onClick={openPreviewModal}></Surface>

            <LexemeStatus
                level={data?.status}
                updateStatus={updateStatus}
            />

            <IconButton
                size="lg"
                variant="plain"
                color="neutral"
                icon="edit_note"
                title='Редактировать слово'
                className="EditBtn"
                disabled={isAuthor}
                onClick={openEditModal}
            />

            <IconButton
                size="lg"
                variant="plain"
                color="neutral"
                icon="delete"
                title='Архивировать слово'
                className="DeleteBtn"
                disabled={isAuthor}
                onClick={deleteLexeme}
            />
        </ListItem>
    );
}