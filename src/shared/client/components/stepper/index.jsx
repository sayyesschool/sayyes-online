import { Children, isValidElement, cloneElement } from 'react';
import classnames from 'classnames';

import { Icon } from 'shared/ui-components';

import './index.scss';

function Stepper({
    steps,
    children = steps
}) {
    return (
        <div className="sy-Stepper">
            {Children.map(children, (step, index) =>
                isValidElement(step) ?
                    cloneElement(step) :
                    <Step key={step.id} graphic={index} {...step} />
            )}
        </div>
    );
}

function Step({
    icon,
    content,
    completed,
    vertical,
    active
}) {
    const classNames = classnames('sy-StepperStep', {
        'sy-StepperStep--completed': completed,
        'sy-StepperStep--active': active,
        'sy-StepperStep--vertical': vertical
    });

    return (
        <span className={classNames}>
            <span className="sy-StepperStep__decorator">
                {completed ?
                    <Icon>check</Icon> :
                    <Icon>{icon}</Icon>
                }
            </span>
            <span className="sy-StepperStep__content">{content}</span>
        </span>
    );
}

function Divider({ vertical }) {
    return (
        <hr className={classnames('sy-StepperDivider', {
            'sy-StepperDivider--vertical': vertical
        })} />
    );
}

Stepper.Step = Step;
Stepper.Divider = Divider;

export { Stepper as default, Stepper, Step, Divider };