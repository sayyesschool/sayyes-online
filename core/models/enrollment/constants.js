const Status = {
    processing: 'В обработке',
    trial: 'Пробный урок',
    payment: 'Оплата',
    active: 'Активное',
    postponed: 'Отложено',
    canceled: 'Отменено',
    completed: 'Завершено'
};

const StatusIcon = {
    processing: 'pending',
    trial: 'event_available',
    payment: 'payment',
    active: 'school',
    postponed: 'next_plan',
    canceled: 'cancel',
    completed: 'check_circle'
};

const Type = {
    individual: 'Индивидуально',
    group: 'В группе'
};

const Format = {
    online: 'Онлайн',
    offline: 'Оффлайн'
};

const Age = {
    adults: 'Взрослые',
    teenagers: 'Подростки',
    children: 'Дети'
};

const Domain = {
    general: 'Общий разговорный курс', // bubbles, book, abc
    business: 'Деловой английский', // business
    prep: 'Подготовка к экзаменам' // cap
};

const Level = {
    beg: 'Beginner',
    elem: 'Elementary',
    pre: 'Pre-Intermediate',
    int: 'Intermediate',
    upper: 'Upper-Intermediate',
    adv: 'Advanced'
};

const Purpose = {
    work: 'Для работы',
    study: 'Для учебы',
    interview: 'Для собеседования',
    travel: 'Для путешествий',
    hobby: 'Для себя (хобби)'
};

module.exports = {
    Status,
    StatusIcon,
    Type,
    Format,
    Age,
    Domain,
    Level,
    Purpose
};