import React from 'react';
import {
    Card,
    Button,
    Typography
} from 'mdc-react';
import classnames from 'classnames';

import { pluralize } from 'shared/utils/format';

import './index.scss';

export default function EnrollmentPackCard({ pack, selected, onSelect }) {
    const classNames = classnames('enrollment-pack-card', {
        'enrollment-pack-card--selected': selected
    });

    return (
        <Card className={classNames} outlined onClick={() => onSelect(pack)}>
            <Typography className="enrollment-pack__price-per-lesson" type="subtitle1" noMargin>{pack.pricePerLesson} ₽ <Typography type="caption" noMargin> / урок</Typography></Typography>

            <Typography element="del" className="enrollment-pack__base-price-per-lesson" type="subtitle2" noMargin>{pack.basePricePerLesson} ₽</Typography>

            <Typography className="enrollment-pack__number-of-lessons" type="overline">{pack.numberOfLessons} {pluralize('урок', pack.numberOfLessons)}</Typography>

            <Button className="enrollment-pack__total-price" unelevated>{pack.price} ₽</Button>

            <Typography element="del" className="enrollment-pack__base-total-price" type="subtitle2" noMargin>{pack.basePricePerLesson * pack.numberOfLessons} ₽</Typography>
        </Card>
    );
}