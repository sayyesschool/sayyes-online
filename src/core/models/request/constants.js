export const RequestChannel = {
    None: '',
    Call: 'call',
    Email: 'email',
    Instagram: 'instagram',
    Site: 'site',
    Telegram: 'telegram',
    WhatsApp: 'whatsapp'
};

export const RequestChannelLabel = {
    [RequestChannel.Call]: 'Звонок',
    [RequestChannel.Instagram]: 'Instagram',
    [RequestChannel.Email]: 'Эл. почта',
    [RequestChannel.Site]: 'Сайт',
    [RequestChannel.Telegram]: 'Telegram',
    [RequestChannel.WhatsApp]: 'WhatsApp'
};

export const RequestSource = {
    None: '',
    Instagram: 'instagram',
    Recommendation: 'recommendation',
    Site: 'site',
    Google: 'google',
    Yandex: 'yandex'
};

export const RequestSourceLabel = {
    [RequestSource.Instagram]: 'Instagram',
    [RequestSource.Yandex]: 'Яндекс',
    [RequestSource.Google]: 'Google',
    [RequestSource.Recommendation]: 'Рекомендация',
    [RequestSource.Site]: 'Сайт'
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

export const RequestType = {
    Call: 'call',
    Lesson: 'lesson',
    Membership: 'membership',
    Study: 'study',
    Test: 'test'
};

export const RequestTypeLabel = {
    [RequestType.Call]: 'Звонок',
    [RequestType.Lesson]: 'Занятие',
    [RequestType.Membership]: 'Абонемент',
    [RequestType.Study]: 'Обучение',
    [RequestType.Test]: 'Тестирование'
};