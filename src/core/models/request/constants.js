export const RequestType = {
    Call: 'call',
    Lesson: 'lesson',
    Study: 'study',
    Test: 'test'
};

export const RequestTypeLabel = {
    [RequestType.Call]: 'Обратный звонок',
    [RequestType.Lesson]: 'Запись на урок',
    [RequestType.Study]: 'Заявка на обучение',
    [RequestType.Test]: 'Тестирование'
};

export const RequestChannel = {
    None: '',
    Call: 'call',
    Instagram: 'instagram',
    Site: 'site',
    Telegram: 'telegram',
    WhatsApp: 'whatsapp'
};

export const RequestChannelLabel = {
    [RequestChannel.Call]: 'Звонок',
    [RequestChannel.Instagram]: 'Instagram',
    [RequestChannel.Site]: 'Сайт',
    [RequestChannel.Telegram]: 'Telegram',
    [RequestChannel.WhatsApp]: 'WhatsApp'
};

export const RequestSource = {
    None: '',
    Instagram: 'instagram',
    Yandex: 'yandex',
    Google: 'google',
    Recommendation: 'recommendation'
};

export const RequestSourceLabel = {
    [RequestSource.Instagram]: 'Instagram',
    [RequestSource.Yandex]: 'Яндекс',
    [RequestSource.Google]: 'Google',
    [RequestSource.Recommendation]: 'Рекомендация'
};

export const RequestStatus = {
    New: 'new',
    Processing: 'processing',
    Postponed: 'postponed',
    Completed: 'completed',
    Canceled: 'canceled'
};

export const RequestStatusLabel = {
    [RequestStatus.New]: 'Новая',
    [RequestStatus.Processing]: 'В работе',
    [RequestStatus.Postponed]: 'Отложена',
    [RequestStatus.Completed]: 'Выполнена',
    [RequestStatus.Canceled]: 'Отменена'
};