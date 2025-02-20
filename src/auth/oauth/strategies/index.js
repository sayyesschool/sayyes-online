import vkontakte from './vkontakte';
import yandex from './yandex';

export default context => ({
    vkontakte: vkontakte(context),
    yandex: yandex(context)
});