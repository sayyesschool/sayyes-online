import { forwardRef } from 'react';

import JoyStepper from '@mui/joy/Stepper';
import classnames from 'classnames';

import Step from './Step';

const Stepper = forwardRef(({
    steps,

    className,
    children,
    ...props
}, ref) => {
    const classNames = classnames('ui-Stepper', className);

    return (
        <JoyStepper
            ref={ref}
            className={classNames}
            {...props}
        >
            {steps?.map((step, index) =>
                <Step key={step?.key || index} {...step} />
            )}

            {children}
        </JoyStepper>
    );
});

Stepper.displayName = 'Stepper';

export default Stepper;