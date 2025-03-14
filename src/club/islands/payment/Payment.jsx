import { useState } from 'preact/hooks';

import { Tab, Tabs } from 'shared/custom-components';
import Checkout from 'shared/islands/checkout';
import Contact from 'shared/islands/contact';
import ErrorState from 'shared/islands/error-state';
import SuccessState from 'shared/islands/success-state';

export default function Payment({ pack, meetingId }) {
    const [view, setView] = useState(0);
    const [contact, setContact] = useState({});
    const [error, setError] = useState(null);

    if (view === 2)
        return <SuccessState />;

    if (view === 3)
        return <ErrorState error={error} />;

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
                    data={{
                        contact,
                        purpose: 'membership',
                        data: {
                            packId: pack.id,
                            meetingId
                        }
                    }}
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