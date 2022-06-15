import { useCallback } from 'react';
import { Box, Button, Text } from '@fluentui/react-northstar';
import classnames from 'classnames';

import { pluralize } from 'shared/utils/format';

import './index.scss';

export default function EnrollmentPackCard({ pack, selected, onSelect }) {
    const handleClick = useCallback(() => {
        onSelect(pack);
    }, [pack, onSelect]);

    const classNames = classnames('enrollment-pack-card', {
        'enrollment-pack-card--selected': selected
    });

    return (
        <Box className={classNames} onClick={handleClick}>
            <Text className="enrollment-pack__price-per-lesson">{pack.pricePerLesson} ₽ <Text> / урок</Text></Text>

            <Text as="del" className="enrollment-pack__base-price-per-lesson">{pack.basePricePerLesson} ₽</Text>

            <Text className="enrollment-pack__number-of-lessons">{pack.numberOfLessons} {pluralize('урок', pack.numberOfLessons)}</Text>

            <Button className="enrollment-pack__total-price" text>{pack.price} ₽</Button>

            <Text as="del" className="enrollment-pack__base-total-price">{pack.basePricePerLesson * pack.numberOfLessons} ₽</Text>
        </Box>
    );
}