import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
    DatePicker,
    CompactPeoplePicker,
    Stack,
    ValidationState
} from '@fluentui/react';
import moment from 'moment';

import api from 'shared/api';
import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';

import './index.scss';

const defaultData = () => ({
    date: new Date(),
    student: {},
    teacher: {},
    description: ''
});

export default function LessonForm({ lesson = defaultData(), onSubmit }) {
    const [students, setStudents] = useState();
    const [teachers, setTeachers] = useState();
    const [data, setData] = useForm({
        date: moment(lesson.date).format('YYYY-MM-DDTHH:mm'),
        student: lesson.student && lesson.student.id,
        teacher: lesson.teacher && lesson.teacher.id
    });

    const handleSubmit = useCallback(() => {
        data.date = moment(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');

        onSubmit(data);
    }, [data]);

    const onResolveStudentSuggestions = (filterText, selectedItems) => {
        if (filterText) {
            console.log(filterText);

            return api.get('/admin/api/students')
                .then(res => res.data)
                .then(data => data.map(teacher => ({ text: teacher.fullname })));
        } else {
            return [];
        }
    };

    const onResolveTeacherSuggestions = (filterText, selectedItems) => {
        if (filterText) {
            console.log(filterText);

            return api.get('/admin/api/teachers')
                .then(res => res.data)
                .then(data => data.map(teacher => ({ text: teacher.fullname })));
        } else {
            return [];
        }
    };

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

    return (
        <Form id="lesson-form" onSubmit={handleSubmit}>
            <Stack tokens={{ childrenGap: 8 }}>
                <DatePicker
                    textField={{
                        name: "date"
                    }}
                    value={data.dob}
                    placeholder="Дата"
                    onChange={setData}
                />

                <CompactPeoplePicker
                    onResolveSuggestions={onResolveStudentSuggestions}
                    getTextFromItem={getTextFromItem}
                    inputProps={{
                        placeholder: 'Ученик'
                    }}
                    pickerSuggestionsProps={{
                        suggestionsHeaderText: 'Suggested People',
                        mostRecentlyUsedHeaderText: 'Suggested Contacts',
                        noResultsFoundText: 'No results found',
                        loadingText: 'Loading',
                        showRemoveButtons: false,
                        suggestionsAvailableAlertText: 'People Picker Suggestions available',
                        suggestionsContainerAriaLabel: 'Suggested contacts'
                    }}
                    onValidateInput={validateInput}
                    resolveDelay={300}
                />

                <CompactPeoplePicker
                    onResolveSuggestions={onResolveTeacherSuggestions}
                    getTextFromItem={getTextFromItem}
                    inputProps={{
                        placeholder: 'Преподаватель'
                    }}
                    pickerSuggestionsProps={{
                        suggestionsHeaderText: 'Suggested People',
                        mostRecentlyUsedHeaderText: 'Suggested Contacts',
                        noResultsFoundText: 'No results found',
                        loadingText: 'Loading',
                        showRemoveButtons: false,
                        suggestionsAvailableAlertText: 'People Picker Suggestions available',
                        suggestionsContainerAriaLabel: 'Suggested contacts'
                    }}
                    onValidateInput={validateInput}
                    resolveDelay={300}
                />
            </Stack>
        </Form>
    );
}