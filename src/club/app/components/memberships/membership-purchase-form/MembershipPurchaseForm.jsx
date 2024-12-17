import { useState } from 'react';

import CheckoutWidget from 'shared/components/checkout-widget';
import { Button, List, Radio, Text } from 'shared/ui-components';

import styles from './MembershipPurchaseForm.module.scss';

export default function MembershipPurchaseForm({ options = [] }) {
    const [selectedOptionId, setSelectedOptionId] = useState(options[0].id);
    const [showCheckout, setShowCheckout] = useState(false);

    const handleCheckout = () => {
        setShowCheckout(true);
    };

    const selectedOption = options.find(option => option.id === selectedOptionId);

    return (
        <div className={styles.root}>
            {showCheckout && selectedOption &&
                <div>
                    <Text type="title-lg" content={selectedOption.title} />
                    <Text content={selectedOption.description} />
                </div>
            }

            {showCheckout ?
                <CheckoutWidget data={{ packId: selectedOptionId }} />
                :
                <>
                    <List gap="sm">
                        {options.map(option =>
                            <List.Item
                                key={option.id}
                                content={{
                                    primary: option.title,
                                    secondary: option.description
                                }}
                                start={
                                    <Radio checked={option.id === selectedOptionId} />
                                }
                                end={<Text type="title-lg" content={`${option.price} ₽`} />}
                                interactive
                                onClick={() => setSelectedOptionId(option.id)}
                            />
                        )}
                    </List>

                    <Button
                        className={styles.button}
                        content="Оплатить"
                        onClick={handleCheckout}
                    />
                </>
            }
        </div>
    );
}