const Status = {
    CANCELED: 'canceled',
    ENDED: 'ended',
    MISSED: 'missed',
    SCHEDULED: 'scheduled',
    STARTED: 'started'
};

const StatusLabel = {
    [Status.SCHEDULED]: 'Запланирован',
    [Status.MISSED]: 'Пропущен',
    [Status.STARTED]: 'Начался',
    [Status.ENDED]: 'Завершился',
    [Status.CANCELED]: 'Отменен'
};

const StatusIcon = {
    [Status.SCHEDULED]: 'event',
    [Status.MISSED]: 'event',
    [Status.STARTED]: 'event',
    [Status.ENDED]: 'event_available',
    [Status.CANCELED]: 'event_busy'
};

module.exports = {
    Status,
    StatusLabel,
    StatusIcon
};