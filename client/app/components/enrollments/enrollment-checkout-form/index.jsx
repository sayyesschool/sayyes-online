import { useCallback, useEffect, useRef } from 'react';
import {
    Button,
    TextField,
    Typography
} from 'mdc-react';

import { pluralize } from 'shared/utils/format';
import { useBoolean } from 'shared/hooks/state';
import Form from 'shared/components/form';

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
        onSubmit({
            enrollmentId: enrollment.id,
            numberOfLessons: pack.numberOfLessons,
            promoCode: textFieldRef.current?.control.value,
            isPromoCodeCorrect
        });
    }, [enrollment, pack, isPromoCodeCorrect]);

    const handlePromoCode = useCallback(() => {
        const promoCode = textFieldRef.current.control.value;

        if (promoCode?.toUpperCase() === 'YES') {
            togglePromoCodeCorrect(true);
        }
    }, []);

    return (
        <div className="enrollment-checkout-form">
            <div className="balance">
                <Typography element="strong" noMargin>{pack.numberOfLessons}</Typography>
                <Typography noMargin>{pluralize('урок', pack.numberOfLessons)}<br />по 50 минут</Typography>
            </div>

            {isPromoCodeCorrect ?
                <Typography noMargin>+2 урока по промокоду</Typography>
                :
                <div className="promocode">
                    {isEnteringPromoCode ?
                        <Form onSubmit={handlePromoCode}>
                            <TextField
                                ref={textFieldRef}
                                placeholder="Промокод"
                                outlined
                                disabled={isPromoCodeCorrect}
                            />

                            <Button type="submit" outlined>Применить</Button>
                        </Form>
                        :
                        <Button type="button" outlined onClick={toggleEnteringPromoCode}>Промокод</Button>
                    }
                </div>
            }

            <div className="price">
                <Typography element="span" type="headline4" noMargin>{pack.price}</Typography>
                <Typography element="span" type="headline6" noMargin> ₽</Typography>
            </div>

            <div className="submit">
                <Button unelevated onClick={handleSubmit}>Оплатить</Button>
            </div>
        </div>
    );
}