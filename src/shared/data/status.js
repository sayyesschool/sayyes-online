const Status = {
    Active: 'active',
    Canceled: 'canceled',
    Completed: 'completed',
    Ended: 'ended',
    Missed: 'missed',
    New: 'new',
    Processing: 'processing',
    Scheduled: 'scheduled',
    Started: 'started',
    Succeeded: 'succeeded'
};

const StatusColor = {
    [Status.Active]: 'primary',
    [Status.Canceled]: 'danger',
    [Status.Completed]: 'success',
    [Status.Ended]: 'success',
    [Status.Missed]: 'warning',
    [Status.New]: 'primary',
    [Status.Processing]: 'warning',
    [Status.Scheduled]: 'primary',
    [Status.Started]: 'info',
    [Status.Succeeded]: 'success'
};

const StatusIcon = {
    [Status.Active]: 'pending',
    [Status.Canceled]: 'cancel',
    [Status.Completed]: 'circle_check',
    [Status.Ended]: 'success',
    [Status.Missed]: 'event',
    [Status.New]: 'new',
    [Status.Processing]: 'pending',
    [Status.Scheduled]: 'schedule',
    [Status.Started]: 'event',
    [Status.Succeeded]: 'done'
};

const StatusLabel = {
    [Status.Canceled]: 'Отменен',
    [Status.Ended]: 'Завершен',
    [Status.Missed]: 'Пропущен',
    [Status.Scheduled]: 'Запланирован',
    [Status.Started]: 'Начался'
};

module.exports = {
    Status,
    StatusColor,
    StatusIcon,
    StatusLabel
};