const Age = {
    adults: 'adults',
    teenagers: 'teenagers',
    children: 'children'
};

const AgeLabel = {
    adults: 'Взрослые',
    teenagers: 'Подростки',
    children: 'Дети'
};

const Domain = {
    general: 'general',
    business: 'business',
    prep: 'prep'
};

const DomainLabel = {
    general: 'Общий разговорный курс', // bubbles, book, abc
    business: 'Деловой английский', // business
    prep: 'Подготовка к экзаменам' // cap
};

const Duration = {
    '25': 25,
    '50': 50,
    '60': 60
};

const Format = {
    online: 'online',
    offline: 'offline'
};

const FormatLabel = {
    online: 'Онлайн',
    offline: 'Оффлайн'
};

const Level = {
    zero: 'zero',
    beg: 'beg',
    elem: 'elem',
    pre: 'pre',
    int: 'int',
    upper: 'upper',
    adv: 'adv'
};

const LevelLabel = {
    zero: 'Нулевой',
    beg: 'Beginner',
    elem: 'Elementary',
    pre: 'Pre-Intermediate',
    int: 'Intermediate',
    upper: 'Upper-Intermediate',
    adv: 'Advanced'
};

const Purpose = {
    work: 'work',
    study: 'study',
    interview: 'interview',
    travel: 'travel',
    hobby: 'hobby',
    exam: 'exam',
    immigration: 'immigration'
};

const PurposeLabel = {
    work: 'Для работы',
    study: 'Для учебы',
    interview: 'Для собеседования',
    travel: 'Для путешествий',
    hobby: 'Для себя (хобби)',
    exam: 'Для сдачи экзамена',
    immigration: 'Иммиграция'
};

const Status = {
    processing: 'processing',
    trial: 'trial',
    payment: 'payment',
    active: 'active',
    postponed: 'postponed',
    canceled: 'canceled',
    completed: 'completed'
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

const StatusLabel = {
    processing: 'В обработке',
    trial: 'Пробный урок',
    payment: 'Оплата',
    active: 'Активное',
    postponed: 'Отложено',
    canceled: 'Отменено',
    completed: 'Завершено'
};

const TeacherType = {
    russian: 'russian',
    bilingual: 'bilingual',
    native: 'native'
};

const TeacherTypeLabel = {
    russian: 'Русскоговорящий',
    bilingual: 'Билингва',
    native: 'Носитель'
};

const Type = {
    individual: 'individual',
    group: 'group'
};

const TypeLabel = {
    individual: 'Индивидуально',
    group: 'В группе'
};

module.exports = {
    Age,
    AgeLabel,
    Domain,
    DomainLabel,
    Duration,
    Format,
    FormatLabel,
    Level,
    LevelLabel,
    Purpose,
    PurposeLabel,
    Status,
    StatusIcon,
    StatusLabel,
    TeacherType,
    TeacherTypeLabel,
    Type,
    TypeLabel
};