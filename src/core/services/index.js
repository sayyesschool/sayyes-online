import Account from './Account';
import Auth from './Auth';
import Checkout from './Checkout';
import Club from './Club';
import Mail from './Mail';
import Newsletter from './Newsletter';
import Schedule from './Schedule';
import Storage from './Storage';

export default (config, clients, models) => {
    const checkout = Checkout({ config, clients, models });

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
            Checkout: checkout,
            Mail: mail,
            Newsletter: newsletter
        }
    });

    const club = Club({
        config,
        clients,
        models,
        services: {
            Auth: auth,
            Checkout: checkout,
            Mail: mail,
            Newsletter: newsletter
        }
    });

    const schedule = Schedule({ config, models });

    const storage = Storage({ config, clients });

    return {
        Account: account,
        Auth: auth,
        Checkout: checkout,
        Club: club,
        Mail: mail,
        Newsletter: newsletter,
        Schedule: schedule,
        Storage: storage
    };
};