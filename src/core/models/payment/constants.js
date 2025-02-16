export const PaymentStatus = {
    Pending: 'pending',
    WaitingForCapture: 'waiting_for_capture',
    Succeeded: 'succeeded',
    Canceled: 'canceled',
    Refunded: 'refunded'
};

export const PaymentStatusLabel = {
    [PaymentStatus.Pending]: 'В обработке',
    [PaymentStatus.WaitingForCapture]: 'В ожидании',
    [PaymentStatus.Succeeded]: 'Завершен',
    [PaymentStatus.Canceled]: 'Отменен',
    [PaymentStatus.Refunded]: 'Возвращен'
};

export const PaymentStatusIcon = {
    [PaymentStatus.Pending]: 'hourglass_empty',
    [PaymentStatus.WaitingForCapture]: 'warning',
    [PaymentStatus.Succeeded]: 'done',
    [PaymentStatus.Canceled]: 'clear',
    [PaymentStatus.Refunded]: 'clear'
};

export const PaymentMethod = {
    AlfaBank: 'alfabank',
    ApplePay: 'apple_pay',
    BankCard: 'bank_card',
    Cash: 'cash',
    GooglePay: 'google_pay',
    MobileBalance: 'mobile_balance',
    SBP: 'sbp',
    SberB2B: 'b2b_sberbank',
    SberLoan: 'sber_loan',
    SberPay: 'sberbank',
    Qiwi: 'qiwi',
    TPay: 'tinkoff_bank',
    Transfer: 'transfer',
    WebMoney: 'webmoney',
    WeChat: 'wechat',
    YooMoney: 'yoo_money'
};

export const PaymentMethodLabel = {
    [PaymentMethod.AlfaBank]: 'Альфа-Банк',
    [PaymentMethod.ApplePay]: 'Apple Pay',
    [PaymentMethod.BankCard]: 'Банковская карта',
    [PaymentMethod.Cash]: 'Наличные',
    [PaymentMethod.GooglePay]: 'Google Pay',
    [PaymentMethod.MobileBalance]: 'Баланс телефона',
    [PaymentMethod.SBP]: 'СБП',
    [PaymentMethod.SberB2B]: 'Сбербанк Бизнес Онлайн',
    [PaymentMethod.SberLoan]: 'Сбербанк Кредит',
    [PaymentMethod.SberPay]: 'Сбербанк Онлайн',
    [PaymentMethod.Qiwi]: 'Qiwi',
    [PaymentMethod.TPay]: 'Т-Банк',
    [PaymentMethod.Transfer]: 'Банковский перевод',
    [PaymentMethod.WebMoney]: 'WebMoney',
    [PaymentMethod.WeChat]: 'WeChat',
    [PaymentMethod.YooMoney]: 'ЮMoney'
};

export const PaymentOperator = {
    YooKassa: 'yookassa',
    Tochka: 'tochka'
};

export const PaymentOperatorLabel = {
    [PaymentOperator.YooKassa]: 'YooKassa',
    [PaymentOperator.Tochka]: 'Точка'
};

export const PaymentPurpose = {
    Balance: 'balance',
    Enrollment: 'enrollment',
    Membership: 'membership',
    Study: 'study'
};

export const PaymentPurposeLabel = {
    [PaymentPurpose.Balance]: 'Пополнение баланса',
    [PaymentPurpose.Enrollment]: 'Оплата обучения',
    [PaymentPurpose.Membership]: 'Оплата абонемента',
    [PaymentPurpose.Study]: 'Оплата тренингов'
};