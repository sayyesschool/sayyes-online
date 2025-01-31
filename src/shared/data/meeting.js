import { MeetingStatus } from 'core/models/meeting/constants';

export const MeetingStatusLabel = {
    [MeetingStatus.Scheduled]: 'Запланирована',
    [MeetingStatus.Started]: 'Началась',
    [MeetingStatus.Ended]: 'Завершилась',
    [MeetingStatus.Canceled]: 'Отменена'
};

export const MeetingStatusIcon = {
    [MeetingStatus.Scheduled]: 'event',
    [MeetingStatus.Started]: 'event',
    [MeetingStatus.Ended]: 'event_available',
    [MeetingStatus.Canceled]: 'event_busy'
};

export const MeetingStatusByType = {
    [MeetingStatus.Scheduled]: 'info',
    [MeetingStatus.Started]: 'warning',
    [MeetingStatus.Ended]: 'success',
    [MeetingStatus.Canceled]: 'error'
};

export const meetingStatusOptions = Object.entries(MeetingStatusLabel).map(([key, value]) => ({
    key: key,
    value: key,
    content: value
}));