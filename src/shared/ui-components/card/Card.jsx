import { forwardRef } from 'react';

import JoyCard from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardCover from '@mui/joy/CardCover';
import CardOverflow from '@mui/joy/CardOverflow';
import classnames from 'classnames';

const Card = forwardRef(({
    as,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Card', className);

    return (
        <JoyCard
            ref={ref}
            component={as}
            className={classNames}
            {...props}
        />
    );
});

Card.displayName = 'Card';

Card.Cover = CardCover;
Card.Content = CardContent;
Card.Overflow = CardOverflow;

export default Card;