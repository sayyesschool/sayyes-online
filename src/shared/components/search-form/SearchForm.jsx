import { useCallback, useState } from 'react';

import { useDebounce } from 'shared/hooks/fn';
import { useSearch } from 'shared/hooks/search';
import { Autocomplete, Button, CircularProgress, Icon } from 'shared/ui-components';

export default function SearchForm({
    comboboxRef,
    apiUrl,
    params,
    delay = 1000,
    placeholder,
    isResultDisabled,
    filterResults,
    renderResult,
    creatable,
    onCreate
}) {
    const {
        query,
        results,
        meta,
        loading,
        search,
        searchMore,
        reset
    } = useSearch({ apiUrl, defaultParams: params });

    const [open, setOpen] = useState(false);

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback((e, reason) => {
        if (reason === 'selectOption') return;

        setOpen(false);
        reset();
    }, [reset]);

    const handleInputChange = useDebounce((e, value, reason) => {
        if (reason === 'clear' || reason === 'reset') {
            setOpen(false);
            reset();
        } else {
            search(value);
        }
    }, delay);

    const handleLoadMore = useCallback(event => {
        event.stopPropagation();
        searchMore();
    }, [searchMore]);

    const handleAddNew = useCallback((event, value) => {
        event.stopPropagation();
        onCreate(value);
        setOpen(false);
        reset();
    }, [onCreate, reset]);

    const filterOptions = useCallback((options, params) => {
        const results = filterResults?.(options, params) ?? options;

        if (meta?.more) {
            results.push({
                type: 'showMore'
            });
        }

        if (creatable && !results.length && params.inputValue !== '') {
            results.push({
                type: 'addNew',
                label: `Добавить "${params.inputValue}"`,
                value: params.inputValue
            });
        }

        return results;
    }, [filterResults, meta?.more, creatable]);

    const renderOption = useCallback((props, option) => {
        return (
            <Autocomplete.Option {...props}>
                {(creatable && option.type === 'addNew') ?
                    <span onClick={e => handleAddNew(e, option.value)}>
                        {option.label}
                    </span>
                    :
                    option.type === 'showMore' ? (
                        <Button
                            content="Показать ещё"
                            onClick={handleLoadMore}
                        />
                    ) : renderResult({
                        ...option,
                        data: option,
                        disabled: props['aria-disabled'],
                        selected: props['aria-selected']
                    })}
            </Autocomplete.Option>
        );
    }, [creatable, handleAddNew, handleLoadMore, renderResult]);

    const isOpen = open && !!query.length;

    const options = results.map(result => ({
        ...result,
        label: result.value
    }));

    return (
        <Autocomplete
            ref={comboboxRef}
            options={options}
            placeholder={placeholder}
            getOptionLabel={option => option?.label ?? ''}
            getOptionDisabled={isResultDisabled}
            startDecorator={<Icon name="search" />}
            endDecorator={loading &&
                <CircularProgress size="sm" />
            }
            noOptionsText="Ничего не найдено"
            renderOption={renderOption}
            filterOptions={filterOptions}
            open={isOpen}
            loading={loading}
            clearOnBlur
            freeSolo
            onInputChange={handleInputChange}
            onOpen={handleOpen}
            onClose={handleClose}
        />
    );
}