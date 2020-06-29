import React from 'react';
import {
    Label,
    CompactPeoplePicker,
    ValidationState
} from '@fluentui/react';

import api from 'shared/api';

export default function PeoplePicker({ name, value, label, placeholder, resolveUrl, ...props }) {
    const onResolveStudentSuggestions = (query, selectedItems) => {
        if (query) {
            return api.get(`${resolveUrl}?search=${query}`)
                .then(res => res.data)
                .then(data => data.map(item => ({ text: item.fullname })));
        } else {
            return [];
        }
    };

    return (
        <div className="ms-PeoplePicker">
            {label &&
                <Label>{label}</Label>
            }

            <CompactPeoplePicker
                onResolveSuggestions={onResolveStudentSuggestions}
                getTextFromItem={getTextFromItem}
                inputProps={{
                    name,
                    value,
                    placeholder
                }}
                pickerSuggestionsProps={{
                    suggestionsHeaderText: 'Suggested People',
                    mostRecentlyUsedHeaderText: 'Suggested Contacts',
                    noResultsFoundText: 'Ничего не найдено',
                    loadingText: 'Загрузка',
                    showRemoveButtons: false
                }}
                onValidateInput={validateInput}
                resolveDelay={300}
                {...props}
            />
        </div>
    );
}

function validateInput(input) {
    if (input.indexOf('@') !== -1) {
        return ValidationState.valid;
    } else if (input.length > 1) {
        return ValidationState.warning;
    } else {
        return ValidationState.invalid;
    }
}

function getTextFromItem(item) {
    return item.text;
}