const Status = {
    scheduled: 'scheduled',
    missed: 'missed',
    started: 'started',
    ended: 'ended',
    canceled: 'canceled'
};

const StatusLabel = {
    scheduled: 'Запланировано',
    missed: 'Пропущено',
    started: 'started',
    ended: 'Завершилось',
    canceled: 'Отменено'
};

const StatusIcon = {
    scheduled: 'event',
    missed: 'event',
    ended: 'event_available',
    canceled: 'event_busy'
};

module.exports = {
    Status,
    StatusLabel,
    StatusIcon
};