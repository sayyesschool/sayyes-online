export const ageLabel = {
    adults: 'Взрослые',
    teenagers: 'Подростки',
    children: 'Дети'
};

export const domainLabel = {
    general: 'Общий разговорный курс',
    business: 'Деловой английский',
    prep: 'Подготовка к экзаменам'
};

export const teacherLabel = {
    russian: 'Русскоговорящий',
    english: 'Англоговорящий'
};

export const ageOptions = Object.entries(ageLabel).map(([key, value]) => ({
    key,
    value: key,
    content: value
}));

export const domainOptions = Object.entries(domainLabel).map(([key, value]) => ({
    key,
    value: key,
    content: value
}));

export const teacherOptions = Object.entries(teacherLabel).map(([key, value]) => ({
    key,
    value: key,
    content: value
}));