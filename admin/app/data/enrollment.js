export const statuses = [
    { key: 'processing', value: 'processing', text: 'В обработке' },
    { key: 'trial', value: 'trial', text: 'Пробный урок' },
    { key: 'payment', value: 'payment', text: 'Оплата' },
    { key: 'active', value: 'active', text: 'Активное' },
    { key: 'postponed', value: 'postponed', text: 'Отложено' },
    { key: 'canceled', value: 'canceled', text: 'Отменено' },
    { key: 'completed', value: 'completed', text: 'Завершено' }
];

export const types = [
    { key: 'null', value: '', text: '' },
    { key: 'individual', value: 'individual', text: 'Индивидуально' },
    { key: 'group', value: 'group', text: 'Группа' }
];

export const formats = [
    { key: 'null', value: '', text: '' },
    { key: 'online', value: 'online', text: 'Онлайн' },
    { key: 'offline', value: 'offline', text: 'Оффлайн' }
];

export const ages = [
    { key: 'null', value: '', text: '' },
    { key: 'adults', value: 'adults', text: 'Взрослые' },
    { key: 'teenagers', value: 'teenagers', text: 'Подростки' },
    { key: 'children', value: 'children', text: 'Дети' }
];

export const levels = [
    { key: 'null', value: '', text: '' },
    { key: 'zero', value: 'zero', text: 'Нулевой' },
    { key: 'beg', value: 'beg', text: 'Beginner' },
    { key: 'elem', value: 'elem', text: 'Elementary' },
    { key: 'pre', value: 'pre', text: 'Pre-Intermediate' },
    { key: 'int', value: 'int', text: 'Intermediate' },
    { key: 'upper', value: 'upper', text: 'Upper-Intermediate' },
    { key: 'adv', value: 'adv', text: 'Advanced' }
];

export const purposes = [
    { key: 'null', value: '', text: '' },
    { key: 'work', value: 'work', text: 'Для работы' },
    { key: 'study', value: 'study', text: 'Для учебы' },
    { key: 'interview', value: 'interview', text: 'Для собеседования' },
    { key: 'travel', value: 'travel', text: 'Для путешествий' },
    { key: 'hobby', value: 'hobby', text: 'Для себя (хобби)' }
];

export const defaultEnrollment = {
    status: 'pending',
    domain: 'general',
    type: '',
    format: '',
    age: '',
    level: '',
    experience: '',
    purpose: '',
    preferences: '',
    trialLesson: [],
    schedule: [],
    note: '',
};