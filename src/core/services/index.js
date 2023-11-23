const Auth = require('./auth');
const Checkout = require('./checkout');
const Club = require('./club');
const File = require('./file');
const Mail = require('./mail');
const Newsletter = require('./newsletter');
const Storage = require('./storage');

module.exports = (config, lib, models) => {
    const mail = Mail(lib.mailjet);
    const newsletter = Newsletter(lib.mailjet);
    const auth = Auth(models, {
        onRegister: (user, password) => mail.send({
            subject: 'Добро пожаловать в SAY YES Online!',
            to: [{
                email: user.email
            }],
            templateId: 1486677,
            variables: {
                firstname: user.firstname,
                email: user.email,
                password
            }
        }),
        onResetPasswordTokenSent: user => mail.send({
            subject: 'Изменение пароля для входа на сайт',
            to: [{
                email: user.email
            }],
            templateId: 5329582,
            variables: {
                firstname: user.firstname,
                resetUrl: `${config.APP_URL}/reset/${user.resetPasswordToken}`
            }
        })
    });
    const checkout = Checkout(config, models);
    const club = Club(lib.zoom, models, { mail: Mail, newsletter: Newsletter, checkout: Checkout });
    const file = File();
    const storage = new Storage({
        accessKeyId: config.YANDEX_CLOUD_ACCESS_KEY_ID,
        secretAccessKey: config.YANDEX_CLOUD_SECRET_ACCESS_KEY,
        endpoint: config.YANDEX_CLOUD_STORAGE_ENDPOINT,
        region: config.YANDEX_CLOUD_STORAGE_REGION,
        bucket: config.YANDEX_CLOUD_STORAGE_BUCKET
    });

    return {
        Auth: auth,
        Checkout: checkout,
        Club: club,
        File: file,
        Mail: mail,
        Newsletter: newsletter,
        Storage: storage
    };
};