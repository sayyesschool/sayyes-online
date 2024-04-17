import Typography from '@mui/joy/Typography';

import { Checkbox, IconButton, ListItem } from 'shared/ui-components';

export default function LeximaItem({ value, translations }) {
    return (
        <ListItem className="LeximaItem">
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

            <Typography className="LeximaItemValue">{value}</Typography>
            —
            <Typography className="LeximaItemTranslation">{translations[0]}</Typography>

            <IconButton
                size="lg"
                variant="plain"
                color="neutral"
                icon="delete"
                title='Архивировать слово'
                className="DeleteBtn"
                onClick={() => console.log('delete')}
            />
        </ListItem>
    );
}