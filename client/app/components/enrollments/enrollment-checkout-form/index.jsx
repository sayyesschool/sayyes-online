import { useCallback, useEffect, useRef } from 'react';
import { Button, Flex, Input, Text } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import { pluralize } from 'shared/utils/format';

import './index.scss';

export default function EnrollmentCheckoutForm({ enrollment, pack = {}, onSubmit }) {
    const inputRef = useRef();

    const [isEnteringPromoCode, toggleEnteringPromoCode] = useBoolean(false);
    const [isPromoCodeCorrect, togglePromoCodeCorrect] = useBoolean(false);

    useEffect(() => {
        if (isEnteringPromoCode) {
            inputRef.current?.focus();
        }
    }, [isEnteringPromoCode]);

    const handleSubmit = useCallback(event => {
        onSubmit({
            enrollmentId: enrollment.id,
            numberOfLessons: pack.numberOfLessons,
            promoCode: inputRef.current?.control.value,
            isPromoCodeCorrect
        });
    }, [enrollment, pack, isPromoCodeCorrect]);

    const handlePromoCode = useCallback(() => {
        const value = inputRef.current.value;

        if (value?.toUpperCase() === 'YES') {
            togglePromoCodeCorrect(true);
        }
    }, []);

    return (
        <div className="enrollment-checkout-form">
            <Text className="balance-text">
                <strong>{pack.numberOfLessons}</strong>
                <span>{pluralize('урок', pack.numberOfLessons)}<br />по 50 минут</span>
            </Text>

            {isPromoCodeCorrect ?
                <Text>+ 2 урока по промокоду</Text>
                :
                <div className="promocode">
                    {isEnteringPromoCode ?
                        <Flex gap="gap.smaller">
                            <Input
                                ref={inputRef}
                                placeholder="Промокод"
                                inverted
                                disabled={isPromoCodeCorrect}
                            />

                            <Button inverted onClick={handlePromoCode}>Применить</Button>
                        </Flex>
                        :
                        <Button inverted onClick={toggleEnteringPromoCode}>Промокод</Button>
                    }
                </div>
            }

            <Text className="price-text">
                <strong>{pack.price}</strong> ₽
            </Text>

            <Button
                className="submit-button"
                primary
                variables={{
                    primaryColor: '#ffffff',
                    primaryBackgroundColor: '#e71985',
                    primaryBackgroundColorHover: '#cf1677'
                }}
                onClick={handleSubmit}>Оплатить</Button>
        </div>
    );
}