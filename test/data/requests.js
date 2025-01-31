export const REQUEST = {
    status: 'new',
    type: 'call',
    contact: {
        name: 'Тест',
        email: 'olegpolyakov@outlook.com',
        phone: '79999999999'
    },
    channel: 'call',
    source: 'google',
    utm: {
        source: 'google',
        medium: 'cpc',
        campaign: 'brand',
        term: 'test',
        content: 'test'
    }
};

export const REQUESTS = [
    REQUEST,
    {
        status: 'processing',
        type: 'call',
        description: 'Тест',
        contact: { name: 'Тест', email: 'test@sayyes.school', phone: '79999999999' },
        channel: 'call',
        source: 'google',
        utm: {
            source: 'google',
            medium: 'cpc',
            campaign: 'brand',
            term: 'test',
            content: 'test'
        }
    },
    {
        status: 'completed',
        type: 'call',
        description: 'Тест',
        contact: { name: 'Тест', email: 'test@sayyes.school', phone: '79999999999' },
        channel: 'call',
        source: 'google',
        utm: {
            source: 'google',
            medium: 'cpc',
            campaign: 'brand',
            term: 'test',
            content: 'test'
        }
    }
];