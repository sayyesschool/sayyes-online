import { render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import cn from 'classnames';

import './islands.scss';

const Button = ({ className, content, full, ...props }) => (
    <button className={cn('btn', { 'btn--full': full }, className)} {...props}>
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

const Item = ({ icon, content, meta, children = content, className, iconClassName, ...props }) => (
    <li className={cn('list-item', className)} {...props}>
        {icon &&
            <span className={cn('list-item__icon', iconClassName)}>{icon}</span>
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

const Payment = ({ contact, pack, meetingId, onComplete, onError }) => {
    const checkoutRef = useRef();

    useEffect(() => {
        fetch('/api/payments', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...contact,
                packId: pack.id,
                meetingId
            })
        })
            .then(res => res.json())
            .then(data => {
                const checkout = new window.YooMoneyCheckoutWidget({
                    confirmation_token: data.confirmation.confirmationToken,
                    customization: {
                        colors: {
                            control_primary: '#6c167b',
                            background: '#ffffff'
                        }
                    },
                    error_callback: error => {
                        console.log(error);
                        onError(error);
                    }
                });

                checkoutRef.current = checkout;

                checkout.render('payment');

                checkout.on('complete', () => {
                    fetch('/api/payments/process', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            source: 'client',
                            event: 'payment.succeeded',
                            object: {
                                id: data.uuid,
                                metadata: data.metadata
                            }
                        })
                    }).then(() => {
                        checkout.destroy();
                        onComplete();
                    }).catch(onError);
                });
            })
            .catch(error => {
                console.log(error);
                checkoutRef.current?.destroy();
                onError(error);
            });

        return () => {
            checkoutRef.current?.destroy();
        };
    }, []);

    return (
        <div id="payment" />
    );
};

const SuccessState = () => (
    <div className="success-state">
        <img src="https://static.sayes.ru/images/cat/cat-thumbup.png" alt="" />
        <h2 className="heading-3">Оплата прошла успешно</h2>
        <h3 className="heading-4">Спасибо за покупку!</h3>
        <p className="text--body1">Вам на почту отправлено письмо с дальнейшими инструкциями.</p>
    </div>
);

const ErrorState = () => (
    <div className="error-state">
        <img src="https://static.sayes.ru/images/cat/cat-sad.png" alt="" />
        <h2 className="heading-3">Ошибка</h2>
        <p className="text--body1">Описание</p>
    </div>
);

const PaymentComponent = ({ pack, meetingId }) => {
    const [view, setView] = useState(0);
    const [contact, setContact] = useState({});

    if (view === 2)
        return <SuccessState />;

    if (view === 3)
        return <ErrorState />;

    return (
        <div className="flex-column gap-l">
            <div className="flex justify-between align-center">
                <div className="flex-column gap-xs">
                    <h2 className="heading-5 m-none">{pack.title}</h2>
                    <p className="text">{pack.description}</p>
                </div>

                <span className="heading heading-4">{pack.price} ₽</span>
            </div>

            <Tabs>
                <Tab
                    content="Контактная информация"
                    icon={view >= 1 ? 'check' : 'person'}
                    active={view === 0}
                />

                <Tab
                    content="Оплата"
                    icon={view >= 2 ? 'check' : 'payment'}
                    active={view === 1}
                />
            </Tabs>

            {view === 0 &&
                <Contact
                    contact={contact}
                    pack={pack}
                    onChange={setContact}
                    onNext={() => setView(1)}
                />
            }

            {view === 1 &&
                <Payment
                    contact={contact}
                    pack={pack}
                    meetingId={meetingId}
                    onComplete={() => setView(2)}
                    onError={() => setView(3)}
                />
            }
        </div>
    );
};

const MeetingComponent = ({ meeting, onRegister }) => {
    return (
        <div className="flex-column gap-l">
            <div className="meeting-card card">
                <div className="card__media">
                    <img src={meeting.thumbnailUrl} alt="" />
                </div>

                <div className="card__header">
                    <div className="flex align-center justify-between gap-xs">
                        <p className="card__subtitle">{meeting.datetime}</p>

                        <div className="tags">
                            <span className="tag">{meeting.levelLabel}</span>

                            <span
                                className={`tag tag--${meeting.online ? 'yellow' : 'purple'}`}
                            >
                                {meeting.online ? 'Онлайн' : 'Оффлайн'}
                            </span>
                        </div>
                    </div>

                    <h3 className="card__title">{meeting.title}</h3>
                </div>

                <div className="card__body">
                    <div
                        className="content"
                        dangerouslySetInnerHTML={{ __html: meeting.description }}
                    />

                    <ul className="list gap-xs">
                        {meeting.host &&
                            <Item
                                content={meeting.host.fullname}
                                iconClassName="teacher-icon"
                                icon
                            />
                        }

                        <Item
                            content={meeting.durationLabel}
                            iconClassName="time-icon"
                            icon
                        />
                    </ul>
                </div>

                <div className="card__footer">
                    <Button
                        content="Записаться"
                        full
                        onClick={onRegister}
                    />
                </div>
            </div>
        </div>
    );
};

class View {
    constructor(selector, Component) {
        this.element = document.querySelector(selector);
        this.component = Component;

        if (!this.element)
            throw new Error(`Element with selector "${selector}" not found`);
    }

    render(data) {
        const Component = this.component;
        render(<Component {...data} />, this.element);
    }

    destroy() {
        render(null, this.element);
    }
}

class PaymentView extends View {
    constructor(selector) {
        super(selector, PaymentComponent);
    }
}

class MeetingView extends View {
    constructor(selector) {
        super(selector, MeetingComponent);
    }
}

window.PaymentView = PaymentView;
window.MeetingView = MeetingView;