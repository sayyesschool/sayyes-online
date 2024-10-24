import { forwardRef } from 'react';

import JoyStep from '@mui/joy/Step';
import JoyStepIndicator from '@mui/joy/StepIndicator';
import classnames from 'classnames';

const Step = forwardRef(({
    indicator,
    active,

    className,
    children,
    ...props
}, ref) => {
    const classNames = classnames(className, 'ui-Step');

    return (
        <JoyStep
            ref={ref}
            indicator={indicator &&
                <JoyStepIndicator>
                    {indicator}
                </JoyStepIndicator>
            }
            active={active}
            className={classNames}
            {...props}
        >
            {children}
        </JoyStep>
    );
});

Step.displayName = 'Step';

export default Step;