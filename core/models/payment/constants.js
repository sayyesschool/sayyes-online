const statuses = {
    pending: 'В обработке',
    waiting_for_capture: 'В ожидании',
    succeeded: 'Завершен',
    canceled: 'Отменен',
    refunded: 'Возвращен'
};

const statusIcons = {
    pending: 'hourglass_empty',
    waiting_for_capture: 'warning',
    succeeded: 'done',
    canceled: 'clear',
    refunded: 'clear'
};

const paymentMethods = {
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

const operators = {
    yookassa: 'YooKassa',
    tochka: 'Точка'
};

module.exports = {
    statuses,
    statusIcons,
    paymentMethods,
    operators
};