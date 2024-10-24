import { forwardRef } from 'react';

import JoySlider from '@mui/joy/Slider';
import classnames from 'classnames';

const Slider = forwardRef(({
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Slider', className);

    return (
        <JoySlider
            ref={ref}
            className={classNames}
            {...props}
        />
    );
});

Slider.displayName = 'Slider';

export default Slider;