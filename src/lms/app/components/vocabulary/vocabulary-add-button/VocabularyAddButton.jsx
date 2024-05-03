import { useCallback, useState } from 'react';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Sheet from '@mui/joy/Sheet';

import { useForm } from 'shared/hooks/form';
import { Button, Form, Popover } from 'shared/ui-components';

import styles from './VocabularyAddButton.module.scss';

export default function VocabularyAddButton({
    numberOfLexemes,
    onAddLexeme,
    children,
    ...props
}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleAddLexeme =  useCallback(data => {
        onAddLexeme(data)
            .finally(() => setAnchorEl(null));
    }, [onAddLexeme]);

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

    return (<>
        <Button
            content="Добавить слово"
            icon="add_circle"
            variant="solid"
            aria-describedby={id}
            onClick={handleClick}
            {...props}
        />

        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            modifiers={[
                {
                    name: 'offset',
                    options: {
                        offset: [0, 10]
                    }
                }
            ]}
        >
            <ClickAwayListener onClickAway={handleClick}>
                <Sheet className={styles.sheet}>
                    <Form
                        className={styles.form}
                        onSubmit={handleSubmit}
                    >
                        <Form.Input
                            className={styles.input}
                            name="value"
                            value={data.value.value}
                            placeholder="Слово"
                            autoComplete="off"
                            onChange={handleChange}
                        />

                        <Form.Input
                            className={styles.input}
                            name="translation"
                            value={data.translation.value}
                            placeholder="Перевод"
                            autoComplete="off"
                            onChange={handleChange}
                        />

                        <Button type="submit" content="Добавить" />
                    </Form>
                </Sheet>
            </ClickAwayListener>
        </Popover>
    </>);
}