import { LessonStatus } from 'core/models/lesson/constants';

export const LessonStatusLabel = {
    [LessonStatus.Scheduled]: 'Запланирован',
    [LessonStatus.Missed]: 'Пропущен',
    [LessonStatus.Started]: 'Начался',
    [LessonStatus.Ended]: 'Завершился',
    [LessonStatus.Canceled]: 'Отменен'
};

export const LessonStatusIcon = {
    [LessonStatus.Scheduled]: 'event',
    [LessonStatus.Missed]: 'event',
    [LessonStatus.Started]: 'event',
    [LessonStatus.Ended]: 'event_available',
    [LessonStatus.Canceled]: 'event_busy'
};

export const LessonStatusByType = {
    [LessonStatus.Scheduled]: 'info',
    [LessonStatus.Missed]: 'unknown',
    [LessonStatus.Started]: 'warning',
    [LessonStatus.Ended]: 'success',
    [LessonStatus.Canceled]: 'error'
};

export const LessonColorByType = {
    [LessonStatus.Scheduled]: 'primary',
    [LessonStatus.Missed]: 'warning',
    [LessonStatus.Started]: 'info',
    [LessonStatus.Ended]: 'success',
    [LessonStatus.Canceled]: 'danger'
};