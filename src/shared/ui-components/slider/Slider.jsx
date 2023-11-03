import { forwardRef } from 'react';
import classnames from 'classnames';

import JoySlider from '@mui/joy/Slider';

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

export default Slider;