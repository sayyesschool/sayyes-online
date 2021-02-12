import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Button,
    TextField,
    Typography
} from 'mdc-react';

import { pluralize } from 'shared/utils/format';
import { useBoolean } from 'shared/hooks/state';
import Form from 'shared/components/Form';

import './index.scss';

export default function EnrollmentCheckoutForm({ enrollment, pack, onSubmit }) {
    const textFieldRef = useRef();
    const [isEnteringPromoCode, toggleEnteringPromoCode] = useBoolean(false);
    const [isPromoCodeCorrect, togglePromoCodeCorrect] = useBoolean(false);

    useEffect(() => {
        if (isEnteringPromoCode) {
            textFieldRef.current.focus();
        }
    }, [isEnteringPromoCode]);

    const handleSubmit = useCallback(event => {
        event.preventDefault();

        onSubmit({
            enrollmentId: enrollment.id,
            numberOfLessons: pack.numberOfLessons,
            promoCode: textFieldRef.current?.control.value,
            isPromoCodeCorrect
        });

        return false;
    }, [enrollment, pack, isPromoCodeCorrect]);

    const handlePromoCode = useCallback(() => {
        const promoCode = textFieldRef.current.control.value;

        if (promoCode?.toUpperCase() === 'SAYYES') {
            togglePromoCodeCorrect(true);
        }
    }, []);

    return (
        <Form
            id="checkout-form"
            className="enrollment-checkout-form"
            method="post"
            action="/api/checkout"
            preventDefault={false}
            onSubmit={handleSubmit}
        >
            <div className="balance">
                <Typography element="strong" noMargin>{pack.numberOfLessons}</Typography>
                <Typography noMargin>{pluralize('урок', pack.numberOfLessons)}<br />по 50 минут</Typography>
            </div>

            {isPromoCodeCorrect &&
                <Typography noMargin>+2 урока по промокоду</Typography>
            }

            <div className="promocode">
                {isEnteringPromoCode ?
                    <>
                        <TextField
                            ref={textFieldRef}
                            placeholder="Промокод"
                            outlined
                            disabled={isPromoCodeCorrect}
                        />

                        <Button type="button" unelevated onClick={handlePromoCode} disabled={isPromoCodeCorrect}>Применить</Button>
                    </>
                    :
                    <Button type="button" unelevated onClick={toggleEnteringPromoCode}>Промокод</Button>
                }
            </div>

            <div className="price">
                <Typography element="span" type="headline4" noMargin>{pack.price}</Typography>
                <Typography element="span" type="headline6" noMargin> ₽</Typography>
            </div>

            <div className="submit">
                <Button type="submit" unelevated>Оплатить</Button>
            </div>
        </Form>
    );
}