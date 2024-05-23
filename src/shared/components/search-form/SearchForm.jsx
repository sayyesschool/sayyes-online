import { useCallback, useState } from 'react';

import { useDebounce } from 'shared/hooks/fn';
import { useSearch } from 'shared/hooks/search';
import { Autocomplete, Button, CircularProgress, Icon } from 'shared/ui-components';

export default function SearchForm({
    apiUrl,
    params,
    delay = 1000,
    placeholder,
    isResultDisabled,
    filterResults,
    renderResult
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

    const handleInputChange = useDebounce((e, value, reason) => {
        if (reason === 'clear' || reason === 'reset') {
            setOpen(false);
            reset();
        } else {
            search(value);
        }
    }, delay);

    const handleLoadMoreButtonClick = useCallback(event => {
        event.stopPropagation();
        searchMore();
    }, [searchMore]);

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback((e, reason) => {
        if (reason === 'selectOption') return;
        setOpen(false);
        reset();
    }, [reset]);

    const filterOptions = useCallback(options => {
        const results = filterResults?.(options) ?? options;

        return !meta?.more ?
            results :
            results.concat({
                value: 'show more',
                type: 'showMoreBtn'
            });
    }, [filterResults, meta?.more]);

    const renderOption = useCallback((props, option) => {
        return (
            <Autocomplete.Option {...props}>
                {option.type === 'showMoreBtn' ? (
                    <Button
                        content="Показать ещё"
                        onClick={handleLoadMoreButtonClick}
                    />
                ) : renderResult({
                    ...option,
                    data: option,
                    disabled: props['aria-disabled'],
                    selected: props['aria-selected']
                })}
            </Autocomplete.Option>
        );
    }, [renderResult, handleLoadMoreButtonClick]);

    const isOpen = open && !!query.length;

    return (
        <Autocomplete
            open={isOpen}
            options={results}
            loading={loading}
            placeholder={placeholder}
            getOptionLabel={option => option.value}
            getOptionDisabled={isResultDisabled}
            clearOnBlur={false}
            startDecorator={<Icon name="search" />}
            endDecorator={loading &&
                <CircularProgress size="sm" />
            }
            noOptionsText="Ничего не найдено"
            renderOption={renderOption}
            filterOptions={filterOptions}
            freeSolo
            onInputChange={handleInputChange}
            onOpen={handleOpen}
            onClose={handleClose}
        />
    );
}