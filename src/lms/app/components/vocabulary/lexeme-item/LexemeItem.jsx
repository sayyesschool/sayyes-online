import Typography from '@mui/joy/Typography';

import { Checkbox, IconButton, ListItem } from 'shared/ui-components';

export default function LexemeItem({ lexeme, handleDeleteLexeme, setCurrentLexeme, toggleDialogOpen }) {
    const { value, translations } = lexeme;

    const openModal = () => {
        toggleDialogOpen();
        setCurrentLexeme(lexeme);
    };

    const deleteLexeme = () => {
        handleDeleteLexeme(lexeme.id);
    };

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
            <Typography className="LexemeItemTranslation">{translations[0].text}</Typography>

            <IconButton
                size="lg"
                variant="plain"
                color="neutral"
                icon="edit"
                title='Редактировать слово'
                className="EditBtn"
                onClick={openModal}
            />

            <IconButton
                size="lg"
                variant="plain"
                color="neutral"
                icon="delete"
                title='Архивировать слово'
                className="DeleteBtn"
                onClick={deleteLexeme}
            />
        </ListItem>
    );
}