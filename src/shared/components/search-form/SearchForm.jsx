import { useCallback, useState } from 'react';

import { useDebounce } from 'shared/hooks/fn';
import { useSearch } from 'shared/hooks/search';
import { Autocomplete, Button, CircularProgress, Icon } from 'shared/ui-components';

import './SearchForm.scss';

function defaultRenderResult(result) {
    return result.label;
}

function getDefaultOptionLabel(option) {
    return option?.label ?? '';
}

export default function SearchForm({
    comboboxRef,
    url,
    params: defaultParams,
    delay = 1000,
    placeholder,
    isResultDisabled,
    filterResults,
    getOptionLabel = getDefaultOptionLabel,
    renderResult = defaultRenderResult,
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
    } = useSearch({ url, defaultParams });

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

        if (creatable && !loading && params.inputValue !== '') {
            results.push({
                type: 'addNew',
                label: `Добавить "${params.inputValue}"`,
                value: params.inputValue
            });
        }

        return results;
    }, [creatable, loading, filterResults, meta?.more]);

    const renderOption = useCallback((props, option) => {
        return renderResult ?
            renderResult({
                data: option,
                disabled: props['aria-disabled'],
                selected: props['aria-selected'],
                ...props
            }) : (
                <Autocomplete.Option {...props}>
                    {option.type === 'addNew' ?
                        <div
                            className="add-new-option"
                            onClick={e => handleAddNew(e, option.value)}
                        >
                            {option.label}
                        </div>
                        :
                        (option.type === 'showMore' ? (
                            <Button
                                content="Показать ещё"
                                onClick={handleLoadMore}
                            />
                        ) : option.label)
                    }
                </Autocomplete.Option>
            );
    }, [handleAddNew, handleLoadMore, renderResult]);

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
            startDecorator={<Icon name="search" />}
            endDecorator={loading &&
                <CircularProgress size="sm" />
            }
            loadingText="Загрузка..."
            noOptionsText="Ничего не найдено"
            getOptionLabel={getOptionLabel}
            getOptionDisabled={isResultDisabled}
            filterOptions={filterOptions}
            renderOption={renderOption}
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