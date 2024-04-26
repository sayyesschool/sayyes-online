
import { useCallback, useState } from 'react';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Sheet from '@mui/joy/Sheet';

import { useForm } from 'shared/hooks/form';
import { Button, Form, IconButton, Popover } from 'shared/ui-components';

import styles from './VocabularyPopover.module.scss';

// TODO: Add transition
export default function VocabularyPopover({ vocabularyId, numberOfLexemes, addLexeme }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleAddLexeme =  useCallback(data => {
        addLexeme(vocabularyId, data)
            .finally(() => setAnchorEl(null));
    }, [addLexeme, vocabularyId]);

    const handleClick = useCallback(event => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }, [anchorEl]);

    const { data, handleChange, handleSubmit } = useForm({
        values: {
            'value*': '',
            'translation*': ''
        },
        onSubmit: handleAddLexeme
    }, [numberOfLexemes]);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <>
            <IconButton
                aria-describedby={id}
                size="lg"
                variant="plain"
                icon="add_circle"
                title='Добавить слово'
                onClick={handleClick}
            />

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
            >
                <ClickAwayListener onClickAway={handleClick}>
                    <Sheet className={styles.sheet}>
                        <Form
                            className={styles.form}
                            onSubmit={handleSubmit}
                        >
                            <Form.Input
                                name="value"
                                placeholder="Слово"
                                autoComplete="off"
                                className={styles.input}
                                value={data.value.value}
                                onChange={handleChange}
                            />

                            <Form.Input
                                name="translation"
                                placeholder="Перевод"
                                autoComplete="off"
                                className={styles.input}
                                value={data.translation.value}
                                onChange={handleChange}
                            />

                            <Button type="submit" content="Добавить слово" />
                        </Form>
                    </Sheet>
                </ClickAwayListener>
            </Popover>
        </>
    );
}