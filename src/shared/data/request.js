import { RequestStatus, RequestStatusLabel } from 'core/models/request/constants';

export { RequestStatusLabel };

export const RequestStatusIcon = {
    [RequestStatus.New]: 'new_releases',
    [RequestStatus.Processing]: 'edit',
    [RequestStatus.Postponed]: 'hourglass_empty',
    [RequestStatus.Completed]: 'check_circle',
    [RequestStatus.Canceled]: 'cancel'
};

export const requestStatusOptions = Object.entries(RequestStatusLabel).map(([key, value]) => ({
    key: key,
    value: key,
    content: value
}));