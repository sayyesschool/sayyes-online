const YandexKassa = require('yandex-kassa');

const { YANDEX_KASSA_SHOP_ID, YANDEX_KASSA_SECRET } = require('../config');

module.exports = new YandexKassa(YANDEX_KASSA_SHOP_ID, YANDEX_KASSA_SECRET);