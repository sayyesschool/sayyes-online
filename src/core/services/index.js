import Account from './account';
import Auth from './auth';
import Checkout from './checkout';
import File from './file';
import Mail from './mail';
import Newsletter from './newsletter';
import Schedule from './schedule';
import Storage from './storage';
import Club from './Сlub';

export default (config, lib, models) => {
    const mail = Mail(lib.mailjet);
    const newsletter = Newsletter(lib.mailjet);
    const checkout = Checkout({ config, models });
    const file = File();
    const storage = new Storage({
        accessKeyId: config.YANDEX_CLOUD_ACCESS_KEY_ID,
        secretAccessKey: config.YANDEX_CLOUD_SECRET_ACCESS_KEY,
        endpoint: config.YANDEX_CLOUD_STORAGE_ENDPOINT,
        region: config.YANDEX_CLOUD_STORAGE_REGION,
        bucket: config.YANDEX_CLOUD_STORAGE_BUCKET
    });

    const auth = Auth({
        models,
        services: {
            Mail: mail
        }
    }, {
        onResetPasswordTokenSent: user => mail.send({
            subject: 'Изменение пароля для входа на сайт',
            to: [{
                email: user.email
            }],
            templateId: 5329582,
            variables: {
                firstname: user.firstname,
                resetUrl: `https://auth.${config.APP_DOMAIN}/reset/${user.resetPasswordToken}`
            }
        })
    });

    const club = Club({
        lib,
        models,
        services: {
            Auth: auth,
            Checkout: checkout,
            Mail: mail,
            Newsletter: newsletter
        }
    });

    const schedule = Schedule({ models });

    const account = Account({
        models,
        services: {
            Auth: auth,
            Checkout: checkout,
            Mail: mail,
            Newsletter: newsletter
        },
        events: {
            onIncreaseBalance: (user, amount) => mail.send({
                to: [{
                    name: user.fullname,
                    email: user.email
                }],
                subject: 'Успешное пополнение баланса',
                templateId: 1348783,
                variables: {
                    firstname: user.firstname
                }
            })
        }
    });

    return {
        Account: account,
        Auth: auth,
        Checkout: checkout,
        Club: club,
        File: file,
        Mail: mail,
        Newsletter: newsletter,
        Schedule: schedule,
        Storage: storage
    };
};