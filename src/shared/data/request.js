import {
    RequestChannelLabel,
    RequestSourceLabel,
    RequestStatus,
    RequestStatusLabel,
    RequestTypeLabel
} from 'core/models/request/constants';

export {
    RequestChannelLabel,
    RequestSourceLabel,
    RequestStatusLabel,
    RequestTypeLabel
};

export const RequestStatusIcon = {
    [RequestStatus.New]: 'new_releases',
    [RequestStatus.Processing]: 'edit',
    [RequestStatus.Postponed]: 'hourglass_empty',
    [RequestStatus.Completed]: 'check_circle',
    [RequestStatus.Canceled]: 'cancel'
};

export const requestStatusMenuItems = Object.entries(RequestStatusLabel).map(([key, value]) => ({
    key: key,
    value: key,
    content: value
}));

export const requestTypeOptions = Object.entries(RequestTypeLabel).map(([key, value]) => ({
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