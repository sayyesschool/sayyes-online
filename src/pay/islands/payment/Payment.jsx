import { useState } from 'preact/hooks';

import { Input, Tab, Tabs } from 'shared/custom-components';

import Checkout from './Checkout';
import Contact from './Contact';
import Error from './Error';
import Pack from './Pack';
import Success from './Success';
import Type from './Type';

const View = {
    TYPE: 0,
    PACK: 1,
    CONTACT: 2,
    CHECKOUT: 3,
    SUCCESS: 4
};

export default function PaymentComponent({ format }) {
    const [view, setView] = useState(format.types ? View.TYPE : View.PACK);
    const [type, setType] = useState();
    const [pack, setPack] = useState();
    const [amount, setAmount] = useState();
    const [contact, setContact] = useState({});
    const [error, setError] = useState(null);

    if (view === 4)
        return <Success />;

    if (error)
        return <Error error={error} />;

    const types = format.types;
    const packs = type ? type.packs : format.packs;

    return (
        <div className="flex-column gap-l">
            <div className="flex align-center justify-between gap-s">
                <div className="flex-column gap-xs">
                    <h3 className="heading-5">{format.title}</h3>

                    {view > View.TYPE &&
                        <div className="flex align-center gap-xs">
                            {view > View.TYPE && type &&
                                <p className="text--body1">{type.description}</p>
                            }

                            {view > View.PACK && pack && <>
                                <span>·</span>
                                <p className="text--body2">{pack.description}</p>
                            </>}
                        </div>
                    }
                </div>

                {view > View.PACK && (pack || amount) &&
                    <p><span className="heading-5">{amount || pack.price}</span> руб.</p>
                }
            </div>

            <Tabs color="violet" pills>
                {types &&
                    <Tab
                        content="Тип обучения"
                        icon={view >= View.PACK ? 'check' : 'person'}
                        active={view === View.TYPE}
                    />
                }

                <Tab
                    content="Пакет"
                    icon={view >= View.CONTACT ? 'check' : 'person'}
                    active={view === View.PACK}
                />

                <Tab
                    content="Контактная информация"
                    icon={view >= View.CHECKOUT ? 'check' : 'person'}
                    active={view === View.CONTACT}
                />

                <Tab
                    content="Оплата"
                    icon={view >= View.SUCCESS ? 'check' : 'payment'}
                    active={view === View.CHECKOUT}
                />
            </Tabs>

            {view === 0 &&
                <Type
                    types={types}
                    selectedType={type}
                    onChange={setType}
                    onNext={() => setView(View.PACK)}
                />
            }

            {view === 1 &&
                <Pack
                    format={format}
                    packs={packs}
                    selectedPack={pack}
                    amount={amount}
                    customPriceAvailable={format.customPriceAvailable}
                    onChange={setPack}
                    onAmountChange={setAmount}
                    onNext={() => setView(View.CONTACT)}
                />
            }

            {view === 2 &&
                <Contact
                    contact={contact}
                    pack={pack}
                    onChange={setContact}
                    onNext={() => setView(View.CHECKOUT)}
                />
            }

            {view === 3 &&
                <Checkout
                    format={format}
                    type={type}
                    pack={pack}
                    amount={amount}
                    contact={contact}
                    onComplete={() => setView(View.SUCCESS)}
                    onError={error => setError(error)}
                />
            }
        </div>
    );
}