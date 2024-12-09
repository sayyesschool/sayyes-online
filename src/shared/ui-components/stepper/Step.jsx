import { forwardRef } from 'react';

import JoyStep from '@mui/joy/Step';
import JoyStepIndicator from '@mui/joy/StepIndicator';
import classnames from 'classnames';

const Step = forwardRef(({
    content,
    indicator,
    active,

    className,
    children = content,
    ...props
}, ref) => {
    const classNames = classnames(className, 'ui-Step');

    return (
        <JoyStep
            ref={ref}
            indicator={indicator}
            active={active}
            className={classNames}
            {...props}
        >
            {children}
        </JoyStep>
    );
});

Step.displayName = 'Step';
Step.Indicator = JoyStepIndicator;

export default Step;