const Status = {
    pending: 'pending',
    waiting_for_capture: 'waiting_for_capture',
    succeeded: 'succeeded',
    canceled: 'canceled',
    refunded: 'refunded'
};

const StatusLabel = {
    pending: 'В обработке',
    waiting_for_capture: 'В ожидании',
    succeeded: 'Завершен',
    canceled: 'Отменен',
    refunded: 'Возвращен'
};

const StatusIcon = {
    pending: 'hourglass_empty',
    waiting_for_capture: 'warning',
    succeeded: 'done',
    canceled: 'clear',
    refunded: 'clear'
};

const PaymentMethod = {
    cash: 'Наличные',
    transfer: 'Перевод',
    bank_card: 'Банковская карта',
    apple_pay: 'Apple Pay',
    google_pay: 'Google Pay',
    yoo_money: 'ЮMoney',
    qiwi: 'QIWI Кошелек',
    webmoney: 'WebMoney',
    sberbank: 'Сбербанк Онлайн',
    alfabank: 'Альфа-Банк',
    tinkoff_bank: 'Тинькофф',
    b2b_sberbank: 'Сбербанк Бизнес Онлайн'
};

const Operator = {
    '': '',
    yookassa: 'YooKassa',
    tochka: 'Точка'
};

module.exports = {
    Status,
    StatusLabel,
    StatusIcon,
    PaymentMethod,
    Operator
};