import { Children, isValidElement, cloneElement } from 'react';
import {
    Icon
} from 'mdc-react';
import classnames from 'classnames';

import './index.scss';

function Stepper({ steps, children = steps }) {
    return (
        <div className="stepper">
            {Children.map(children, (step, index) =>
                isValidElement(step) ?
                    cloneElement(step) :
                    <Step key={step.id} graphic={index} {...step} />
            )}
        </div>
    );
}

function Step({ graphic, label, completed, vertical, active }) {
    return (
        <span className={classnames('stepper__step', {
            'stepper__step--completed': completed,
            'stepper__step--active': active,
            'stepper__step--vertical': vertical
        })}>
            <span className="stepper__step__graphic">
                {completed ?
                    <Icon>check</Icon> :
                    graphic
                }
            </span>
            <span className="stepper__step__label">{label}</span>
        </span>
    );
}

function Divider({ vertical }) {
    return (
        <hr className={classnames('stepper__divider', {
            'stepper__divider--vertical': vertical
        })} />
    );
}

Stepper.Step = Step;
Stepper.Divider = Divider;

export { Stepper as default, Stepper, Step, Divider };