import Account from './Account';
import Auth from './Auth';
import Checkout from './Checkout';
import Class from './Class';
import Club from './Club';
import Mail from './Mail';
import Newsletter from './Newsletter';
import Storage from './Storage';

export default (config, clients, models) => {
    const mail = Mail({ config, clients });
    const newsletter = Newsletter({ config, clients });

    const auth = Auth({
        config,
        models,
        services: {
            Mail: mail
        }
    });

    const account = Account({
        config,
        models,
        services: {
            Auth: auth,
            Mail: mail,
            Newsletter: newsletter
        }
    });

    return {
        Account: account,
        Auth: auth,
        Checkout: Checkout({
            config,
            clients,
            models,
            services: {
                Auth: auth
            }
        }),
        Class: Class({
            config,
            models,
            services: {
                Mail: mail
            }
        }),
        Club: Club({
            config,
            clients,
            models,
            services: {
                Auth: auth,
                Mail: mail,
                Newsletter: newsletter
            }
        }),
        Mail: mail,
        Newsletter: newsletter,
        Storage: Storage({ config, clients })
    };
};