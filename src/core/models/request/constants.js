const RequestChannel = {
    None: '',
    Site: 'site',
    Call: 'call',
    WhatsApp: 'whatsapp',
    Instagram: 'instagram'
};

const RequestSource = {
    None: '',
    Instagram: 'instagram',
    WhatsApp: 'whatsapp',
    Yandex: 'yandex',
    Google: 'google',
    Recommendation: 'recommendation'
};

const RequestStatus = {
    New: 'new',
    Processing: 'processing',
    Postponed: 'postponed',
    Completed: 'completed',
    Canceled: 'canceled'
};

module.exports = {
    RequestChannel,
    RequestSource,
    RequestStatus
};