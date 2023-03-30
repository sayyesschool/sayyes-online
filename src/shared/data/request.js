const { RequestChannel, RequestSource, RequestStatus } = require('../../core/models/request/constants');

const RequestStatusLabel = {
    [RequestStatus.New]: 'Новая',
    [RequestStatus.Processing]: 'В обработке',
    [RequestStatus.Postponed]: 'В обработке',
    [RequestStatus.Completed]: 'Завершена',
    [RequestStatus.Canceled]: 'Отменена'
};

const RequestStatusIcon = {
    [RequestStatus.New]: 'new_releases',
    [RequestStatus.Processing]: 'edit',
    [RequestStatus.Postponed]: 'hourglass_empty',
    [RequestStatus.Completed]: 'check_circle',
    [RequestStatus.Canceled]: 'cancel'
};

const RequestChannelLabel = {
    [RequestChannel.None]: '',
    [RequestChannel.Call]: 'Звонок',
    [RequestChannel.Site]: 'Сайт',
    [RequestChannel.WhatsApp]: 'WhatsApp',
    [RequestChannel.Instagram]: 'Instagram'
};

const RequestSourceLabel = {
    [RequestSource.None]: '',
    [RequestSource.Instagram]: 'Instagram',
    [RequestSource.WhatsApp]: 'WhatsApp',
    [RequestSource.Yandex]: 'Яндекс',
    [RequestSource.Google]: 'Google',
    [RequestSource.Recommendation]: 'Рекомендация'
};

const requestStatusMenuItems = Object.entries(RequestStatusLabel).map(([key, value]) => ({
    key: key,
    value: key,
    content: value
}));

const requestStatusOptions = Object.entries(RequestStatusLabel).map(([key, value]) => ({
    key: key,
    value: key,
    label: value
}));

const requestChannelOptions = Object.entries(RequestChannelLabel).map(([key, value]) => ({
    key: key,
    value: key,
    label: value
}));

const requestSourceOptions = Object.entries(RequestSourceLabel).map(([key, value]) => ({
    key: key,
    value: key,
    label: value
}));

module.exports = {
    RequestStatus,
    RequestStatusLabel,
    RequestStatusIcon,
    requestStatusMenuItems,
    requestChannelOptions,
    requestSourceOptions,
    requestStatusOptions
};