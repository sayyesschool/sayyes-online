import { useState } from 'preact/hooks';

import { Tab, Tabs } from '../shared';

import Checkout from './Checkout';
import Contact from './Contact';
import Error from './Error';
import Success from './Success';

export default function PaymentComponent({ pack, meetingId }) {
    const [view, setView] = useState(0);
    const [contact, setContact] = useState({});
    const [error, setError] = useState(null);

    if (view === 2)
        return <Success />;

    if (view === 3)
        return <Error error={error} />;

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
                <Checkout
                    contact={contact}
                    pack={pack}
                    meetingId={meetingId}
                    onComplete={() => setView(2)}
                    onError={error => {
                        setError(error);
                        setView(3);
                    }}
                />
            }
        </div>
    );
}