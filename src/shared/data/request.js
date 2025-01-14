import { RequestChannel, RequestSource, RequestStatus } from '../../core/models/request/constants';

export const RequestStatusLabel = {
    [RequestStatus.New]: 'Новая',
    [RequestStatus.Processing]: 'В обработке',
    [RequestStatus.Postponed]: 'В обработке',
    [RequestStatus.Completed]: 'Завершена',
    [RequestStatus.Canceled]: 'Отменена'
};

export const RequestStatusIcon = {
    [RequestStatus.New]: 'new_releases',
    [RequestStatus.Processing]: 'edit',
    [RequestStatus.Postponed]: 'hourglass_empty',
    [RequestStatus.Completed]: 'check_circle',
    [RequestStatus.Canceled]: 'cancel'
};

export const RequestChannelLabel = {
    [RequestChannel.None]: '',
    [RequestChannel.Call]: 'Звонок',
    [RequestChannel.Site]: 'Сайт',
    [RequestChannel.WhatsApp]: 'WhatsApp',
    [RequestChannel.Instagram]: 'Instagram'
};

export const RequestSourceLabel = {
    [RequestSource.None]: '',
    [RequestSource.Instagram]: 'Instagram',
    [RequestSource.WhatsApp]: 'WhatsApp',
    [RequestSource.Yandex]: 'Яндекс',
    [RequestSource.Google]: 'Google',
    [RequestSource.Recommendation]: 'Рекомендация'
};

export const requestStatusMenuItems = Object.entries(RequestStatusLabel).map(([key, value]) => ({
    key: key,
    value: key,
    content: value
}));

export const requestStatusOptions = Object.entries(RequestStatusLabel).map(([key, value]) => ({
    key: key,
    value: key,
    content: value
}));

export const requestChannelOptions = Object.entries(RequestChannelLabel).map(([key, value]) => ({
    key: key,
    value: key,
    content: value
}));

export const requestSourceOptions = Object.entries(RequestSourceLabel).map(([key, value]) => ({
    key: key,
    value: key,
    content: value
}));