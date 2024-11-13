// eslint-disable-next-line no-undef
const { render } = preact;
// eslint-disable-next-line no-undef
const { useEffect, useRef, useState } = preactHooks;
// eslint-disable-next-line no-undef
const { html } = htmPreact;

const packs = [{
    id: 1,
    description: '4 занятия',
    price: 1990
},
{
    id: 2,
    description: '8 занятий',
    price: 4990
},
{
    id: 3,
    description: '16 занятий',
    price: 7990
}];

function cn(...classes) {
    return classes.reduce((acc, c) => {
        if (typeof c === 'string') {
            acc.push(c);
        } else if (typeof c === 'object') {
            Object.entries(c).forEach(([key, value]) => {
                if (value) {
                    acc.push(key);
                }
            });
        }

        return acc;
    }, []).join(' ');
}

const Button = ({ className, content, ...props }) => html`
    <button class="btn${className ? ` ${className}` : ''}" ...${props}>
        ${content}
    </button>
`;

const Checkbox = ({ name, value, id = `${name}_${value}`, label, onChange, ...props }) => html`
    <div class="checkbox">
        <input
            id=${id}
            class="checkbox__input"
            type="checkbox"
            name=${name}
            value=${value}
            onInput=${onChange}
            ...${props}
        />

        <span class="checkbox__checkmark" />

        ${label && html`
            <label class="checkbox__label" for="${id}">
                ${label}
            </label>
        `}
    </div>
`;

const Input = ({ invalid, ...props }) => html`
    <input class=${cn('input', { 'input--invalid': invalid })} ...${props} />
`;

const Item = ({ icon, content, meta, children = content, ...props }) => html`
    <li class="list-item" ...${props}>
        ${icon && html`
            <span class="list-item__icon">${icon}</span>
        `}

        <span class="list-item__content">${children}</span>
    </li>
`;

const Radio = ({ name, value, id = `${name}_${value}`, label, onChange, ...props }) => html`
    <div class="radio">
        <input
            id=${id}
            class="radio__input"
            type="radio"
            name=${name}
            value=${value}
            ...${props}
        />

        ${label && html`
            <label class="radio__label" for="${id}">${label}</label>
        `}
    </div>
`;

const Tab = ({ content, icon, active, onClick }) => html`
    <button class=${cn('tab', { 'tab--active': active })} onClick=${onClick} role="tab">
        ${icon && html`
            <span class="tab__icon icon material-icons" aria-hidden="true">${icon}</span>
        `}

        <span class="tab__content">${content}</span>
    </button>
`;

const Tabs = ({ children }) => html`
    <div class="tabs tabs--centered tabs--pills tabs--violet modal-tabs">
        <div class="tabs__nav">
            ${children}
        </div>
    </div>
`;

const Packs = ({ packs, selectedPack, onChange, onNext }) => html`
    <div id="packs" class="flex column gap-l">
        <ul class="list gap-s">
            ${packs?.map(p => html`
                <${Item} key=${p.id}>
                    <${Radio}
                        name="pack"
                        value=${p.id}
                        checked=${selectedPack?.id === p.id}
                        label=${html`
                            <div class="flex fill align-center justify-between">
                                <span class="text">${p.description}</span>
                                <span class="heading-5">${p.price} руб.</span>
                            </div>
                        `}
                        onInput=${() => onChange(p)}
                    />
                <//>
            `)}
        </ul>

        <div class="flex justify-center">
            <${Button}
                content="Далее"
                disabled=${!selectedPack}
                onClick=${onNext}
            />
        </div>
    </div>
`;

const Contact = ({ contact, onChange, onNext }) => {
    const [consent, setConsent] = useState(false);

    const isValid = contact.name && contact.email && contact.phone && consent;

    return html`
        <div id="contact" class="flex flex-column align-center gap-s">
            <${Input}
                placeholder="Имя"
                name="name"
                value=${contact.name}
                onInput=${event => onChange(prev => ({ ...prev, [event.target.name]: event.target.value }))}
            />
            
            <${Input}
                placeholder="Email"
                name="email"
                value=${contact.email}
                onInput=${event => onChange(prev => ({ ...prev, [event.target.name]: event.target.value }))}
            />

            <${Input}
                placeholder="Телефон"
                name="phone"
                value=${contact.phone}
                onInput=${event => onChange(prev => ({ ...prev, [event.target.name]: event.target.value }))}
            />

            <${Checkbox}
                id="consent"
                checked=${consent}
                label="Я согласен/на на обработку персональных данных"
                onChange=${() => setConsent(v => !v)}
            />

            <${Button}
                content="Далее"
                disabled=${!isValid}
                outlined onClick=${onNext}
            />
        </div>
    `;
};

const Payment = ({ contact, pack, onComplete }) => {
    const checkoutRef = useRef();

    useEffect(() => {
        fetch('/pay', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contact,
                pack
            })
        }).then(res => res.json())
            .then(data => {
                const checkout = new window.YooMoneyCheckoutWidget({
                    confirmation_token: data.confirmation.confirmation_token,
                    customization: {
                        colors: {
                            control_primary: '#6c167b',
                            background: '#ffffff'
                        }
                    },
                    error_callback: error => {
                        console.log(error);
                    }
                });

                checkout.render('payment');

                checkout.on('complete', () => {
                    checkout.destroy();
                    onComplete();
                });

                checkoutRef.current = checkout;
            });

        return () => {
            checkoutRef.current?.destroy();
        };
    }, []);

    return html`
        <div id="payment" />
    `;
};

const Success = ({ contact, pack }) => {
    useEffect(() => {
        fetch('/pay', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                pack: pack.description,
                price: pack.price
            })
        });
    }, []);

    return html`
        <div id="success" class="flex column align-center">
            <img src="https://static.sayes.ru/images/cat/cat-thumbup.png" class="success-img" alt="" />

            <h2 class="heading-3">Оплата прошла успешно</h2>

            <h3 class="heading-4">Спасибо за покупку!</h3>

            <p class="text--body1">Вам на почту отправлено письмо с дальнейшими инструкциями.</p>
        </div>
    `;
};

const App = ({ packIndex }) => {
    const [view, setView] = useState(0);
    const [contact, setContact] = useState({});

    const currentPack = packs.find(item => item.id === packIndex);

    return html`
        <div class="flex column gap-l">
            <div class="pack-info">
                <span class="card__title primary-color">${currentPack.description}</span>
                <span class="card__title primary-color">${currentPack.price}</span>
            </div>

            <${Tabs}>
                <${Tab}
                    content="Контактная информация"
                    active=${view >= 0}
                />

                <${Tab}
                    content="Оплата"
                    active=${view >= 1}
                />
            <//>

            ${view === 0 && html`
                <${Contact}
                    contact=${contact}
                    onChange=${setContact}
                    onNext=${() => setView(1)}
                />
            `}

            ${view === 1 && html`
                <${Payment}
                    contact=${contact}
                    pack=${currentPack}
                    onComplete=${() => setView(2)}
                />
            `}

            ${view === 2 && html`
                <${Success}
                    contact=${contact}
                    pack=${currentPack}
                />
            `}
        </div>
    `;
};

const Meeting = () => {
    return html`
        <div class="flex column gap-l">
            Meeting
        </div>
    `;
};