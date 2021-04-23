const Status = {
    scheduled: 'scheduled',
    missed: 'missed',
    ended: 'ended',
    canceled: 'canceled'
};

const StatusLabel = {
    scheduled: 'Запланировано',
    missed: 'Пропущено',
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