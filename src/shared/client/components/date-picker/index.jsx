import { useCallback } from 'react';
import {
    DatePicker as MSDatePicker,
    DayOfWeek
} from '@fluentui/react';
import moment from 'moment';

export default function DatePicker({ name, required, onChange, ...props }) {
    const onSelectDate = useCallback(date => {
        onChange({ target: { name } }, date);
    }, []);

    return (
        <MSDatePicker
            textField={{ name }}
            firstDayOfWeek={DayOfWeek.Monday}
            strings={strings}
            isRequired={required}
            allowTextInput
            onSelectDate={onSelectDate}
            formatDate={formatDate}
            parseDateFromString={parseDateFromString}
            {...props}
        />
    );
}

const strings = {
    months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октяюрь',
        'Ноябрь',
        'Декабрь'
    ],

    shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],

    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],

    shortDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],

    goToToday: 'Сегодня'
};

function parseDateFromString(value) {
    return moment(value, 'DD.MM.YYYY').toDate();
}

function formatDate(date) {
    return moment(date).format('DD.MM.YYYY');
}