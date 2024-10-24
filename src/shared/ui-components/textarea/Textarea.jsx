import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyTextarea from '@mui/joy/Textarea';

const Textarea = forwardRef(({
    start,
    end,

    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Textarea', className);

    return (
        <JoyTextarea
            ref={ref}
            className={classNames}
            startDecorator={start}
            endDecorator={end}

            {...props}
        />
    );
});

Textarea.displayName = 'Textarea';

export default Textarea;