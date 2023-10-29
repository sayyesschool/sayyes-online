import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyCard from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';

const Card = forwardRef(({
    as,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Card', className);

    return (
        <JoyCard
            component={as}
            ref={ref}
            className={classNames}
            {...props}
        />
    );
});

Card.Cover = CardCover;
Card.Content = CardContent;
Card.Overflow = CardOverflow;

export default Card;