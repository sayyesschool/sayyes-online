const { Status, Type } = require('../../core/models/enrollment/constants');

const StatusIcon = {
    [Status.Active]: 'school',
    [Status.Canceled]: 'cancel',
    [Status.Completed]: 'check_circle',
    [Status.Payment]: 'payment',
    [Status.Postponed]: 'next_plan',
    [Status.Processing]: 'pending',
    [Status.Trial]: 'event_available'
};

const StatusLabel = {
    [Status.Active]: 'Активное',
    [Status.Canceled]: 'Отменено',
    [Status.Completed]: 'Завершено',
    [Status.Payment]: 'Оплата',
    [Status.Postponed]: 'Отложено',
    [Status.Processing]: 'В обработке',
    [Status.Trial]: 'Пробный урок'
};

const TypeLabel = {
    [Type.Individual]: 'Индивидуально',
    [Type.Group]: 'В группе'
};

const statusOptions = Object.entries(constants.StatusLabel).map(([key, value]) => ({
    key,
    value: key,
    label: value,
    content: value
}));

const typeOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(constants.TypeLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

module.exports = {
    ...constants,
    StatusIcon,
    StatusLabel,
    TypeLabel,
    defaultEnrollment,
    statusOptions,
    typeOptions,
};