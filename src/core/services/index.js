import Account from './Account';
import Auth from './Auth';
import Checkout from './Checkout';
import Class from './Class';
import Club from './Club';
import Dictionary from './Dictionary';
import Mail from './Mail';
import Newsletter from './Newsletter';
import Storage from './Storage';
import Task from './Task';
import Vocabulary from './Vocabulary';

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
        Dictionary: Dictionary({ config, models }),
        Task: Task({ config, models }),
        Vocabulary: Vocabulary({ config, models }),
        Mail: mail,
        Newsletter: newsletter,
        Storage: Storage({ config, clients })
    };
};