const { LessonStatus } = require('@/core/models/lesson/constants');

const LessonStatusLabel = {
    [LessonStatus.Scheduled]: 'Запланирован',
    [LessonStatus.Missed]: 'Пропущен',
    [LessonStatus.Started]: 'Начался',
    [LessonStatus.Ended]: 'Завершился',
    [LessonStatus.Canceled]: 'Отменен'
};

const LessonStatusIcon = {
    [LessonStatus.Scheduled]: 'event',
    [LessonStatus.Missed]: 'event',
    [LessonStatus.Started]: 'event',
    [LessonStatus.Ended]: 'event_available',
    [LessonStatus.Canceled]: 'event_busy'
};

const LessonStatusByType = {
    [LessonStatus.Scheduled]: 'info',
    [LessonStatus.Missed]: 'unknown',
    [LessonStatus.Started]: 'warning',
    [LessonStatus.Ended]: 'success',
    [LessonStatus.Canceled]: 'error'
};

const LessonColorByType = {
    [LessonStatus.Scheduled]: 'primary',
    [LessonStatus.Missed]: 'warning',
    [LessonStatus.Started]: 'info',
    [LessonStatus.Ended]: 'success',
    [LessonStatus.Canceled]: 'danger'
};

module.exports = {
    LessonStatusLabel,
    LessonStatusIcon,
    LessonStatusByType,
    LessonColorByType
};