export const RequestStatus = {
    New: 'new',
    Processing: 'processing',
    Pending: 'pending',
    Postponed: 'postponed',
    Completed: 'completed',
    Canceled: 'canceled'
};

export const RequestStatusLabel = {
    [RequestStatus.New]: 'Новая',
    [RequestStatus.Processing]: 'В процессе',
    [RequestStatus.Pending]: 'В ожидании', // ???
    [RequestStatus.Postponed]: 'Отложена',
    [RequestStatus.Completed]: 'Обработана',
    [RequestStatus.Rejected]: 'Отказ',
    [RequestStatus.NonTarget]: 'Нецелевое обращение'
};