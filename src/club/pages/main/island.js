import { render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import cn from 'classnames';

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

const Button = ({ className, content, ...props }) => (
    <button className={`btn${className ? ` ${className}` : ''}`} {...props}>
        {content}
    </button>
);

const Checkbox = ({ name, value, id = `${name}_${value}`, label, onChange, ...props }) => (
    <div className="checkbox">
        <input
            id={id}
            className="checkbox__input"
            type="checkbox"
            name={name}
            value={value}
            onInput={onChange}
            {...props}
        />

        <span className="checkbox__checkmark" />

        {label &&
            <label className="checkbox__label" htmlFor={id}>
                {label}
            </label>
        }
    </div>
);

const Input = ({ invalid, ...props }) => (
    <input className={cn('input', { 'input--invalid': invalid })} {...props} />
);

const Item = ({ icon, content, meta, children = content, ...props }) => (
    <li className="list-item" {...props}>
        {icon &&
            <span className="list-item__icon">{icon}</span>
        }

        <span className="list-item__content">{children}</span>
    </li>
);

const Radio = ({ name, value, id = `${name}_${value}`, label, onChange, ...props }) => (
    <div className="radio">
        <input
            id={id}
            className="radio__input"
            type="radio"
            name={name}
            value={value}
            {...props}
        />

        {label &&
            <label className="radio__label" htmlFor={id}>{label}</label>
        }
    </div>
);

const Tab = ({ content, icon, active, onClick }) => (
    <button
        className={cn('tab', { 'tab--active': active })} role="tab"
        onClick={onClick}
    >
        {icon &&
            <span className="tab__icon icon material-icons" aria-hidden="true">{icon}</span>
        }

        <span className="tab__content">{content}</span>
    </button>
);

const Tabs = ({ children }) => (
    <div className="tabs tabs--centered tabs--pills tabs--violet">
        <div className="tabs__nav">
            {children}
        </div>
    </div>
);

const Packs = ({ packs, selectedPack, onChange, onNext }) => (
    <div id="packs" className="flex column gap-l">
        <ul className="list gap-s">
            {packs?.map(p =>
                <Item key={p.id}>
                    <Radio
                        name="pack"
                        value={p.id}
                        checked={selectedPack?.id === p.id}
                        label={
                            <div className="flex fill align-center justify-between">
                                <span className="text">{p.description}</span>
                                <span className="heading-5">{p.price} руб.</span>
                            </div>
                        }
                        onInput={() => onChange(p)}
                    />
                </Item>
            )}
        </ul>

        <div className="flex justify-center">
            <Button
                content="Далее"
                disabled={!selectedPack}
                onClick={onNext}
            />
        </div>
    </div>
);

const Contact = ({ contact, onChange, onNext }) => {
    const [consent, setConsent] = useState(false);

    const isValid = contact.name && contact.email && contact.phone && consent;

    return (
        <div id="contact" className="flex flex-column align-center gap-s">
            <Input
                placeholder="Имя"
                name="name"
                value={contact.name}
                onInput={event => onChange(prev => ({ ...prev, [event.target.name]: event.target.value }))}
            />

            <Input
                placeholder="Email"
                name="email"
                value={contact.email}
                onInput={event => onChange(prev => ({ ...prev, [event.target.name]: event.target.value }))}
            />

            <Input
                placeholder="Телефон"
                name="phone"
                value={contact.phone}
                onInput={event => onChange(prev => ({ ...prev, [event.target.name]: event.target.value }))}
            />

            <Checkbox
                id="consent"
                checked={consent}
                label="Я согласен/на на обработку персональных данных"
                onChange={() => setConsent(v => !v)}
            />

            <Button
                content="Далее"
                disabled={!isValid}
                outlined
                onClick={onNext}
            />
        </div>
    );
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
        })
            .then(res => res.json())
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

    return (
        <div id="payment" />
    );
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

    return (
        <div id="success" className="flex column align-center">
            <img src="https://static.sayes.ru/images/cat/cat-thumbup.png" alt="" />
            <h2 className="heading-3">Оплата прошла успешно</h2>
            <h3 className="heading-4">Спасибо за покупку!</h3>
            <p className="text--body1">Вам на почту отправлено письмо с дальнейшими инструкциями.</p>
        </div>
    );
};

const App = () => {
    const [view, setView] = useState(0);
    const [pack, setPack] = useState();
    const [contact, setContact] = useState({});

    return (
        <div className="flex column gap-l">
            <Tabs>
                <Tab
                    content="Пакет"
                    active={view >= 0}
                />

                <Tab
                    content="Контактная информация"
                    active={view >= 1}
                />

                <Tab
                    content="Оплата"
                    active={view >= 2}
                />
            </Tabs>

            {view === 0 &&
                <Packs
                    packs={packs}
                    selectedPack={pack}
                    onChange={setPack}
                    onNext={() => setView(1)}
                />
            }

            {view === 1 &&
                <Contact
                    contact={contact}
                    onChange={setContact}
                    onNext={() => setView(2)}
                />
            }

            {view === 2 &&
                <Payment
                    contact={contact}
                    pack={pack}
                    onComplete={() => setView(3)}
                />
            }

            {view === 3 &&
                <Success
                    contact={contact}
                    pack={pack}
                />
            }
        </div>
    );
};