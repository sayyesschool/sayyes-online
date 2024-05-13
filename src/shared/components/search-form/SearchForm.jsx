import { useCallback, useState } from 'react';

import { useSearch } from 'shared/hooks/search';
import { Autocomplete, Button, Icon, ListItem } from 'shared/ui-components';

export default function SearchForm({
    apiUrl,
    limit,
    withShowMoreBtn,
    placeholder,
    optionItem: OptionItem,
    optionItemProps
}) {
    const { query, results, loading, showMore, handleInputChange, loadMore } =
    useSearch({ apiUrl, limit });
    const [open, setOpen] = useState(false);
    const isOpen = open && !!query.length;

    const handleOpen = () => setOpen(true);
    const handleClose = (e, reason) => {
        if (reason === 'selectOption') return;
        setOpen(false);
    };

    const renderOption = useCallback((props, option) => {
        return (
            <ListItem {...props}>
                {option.type === 'showMoreBtn' ? (
                    <Button className="autocomplete-show-more-btn" onClick={loadMore}>
                        Показать ещё
                    </Button>
                ) : (
                    <OptionItem option={option} {...optionItemProps} />
                )}
            </ListItem>
        );
    }, [loadMore, optionItemProps]);

    const filterOptions = useCallback(options => {
        let result = [...options.sort((a, b) => b.value.localeCompare(a.value))];
        if (showMore && withShowMoreBtn) {
            result = [...result, { value: 'show more', type: 'showMoreBtn' }];
        }
        return result;
    }, [showMore, withShowMoreBtn]);

    return (
        <Autocomplete
            open={isOpen}
            options={results}
            loading={loading}
            placeholder={placeholder}
            getOptionLabel={option => option.value}
            clearOnBlur={false}
            startDecorator={<Icon name="search" />}
            noOptionsText="Ничего не найдено"
            renderOption={renderOption}
            filterOptions={filterOptions}
            onInputChange={handleInputChange}
            onOpen={handleOpen}
            onClose={handleClose}
        />
    );
}