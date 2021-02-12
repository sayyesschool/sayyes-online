import React from 'react';
import {
    Icon
} from 'mdc-react';
import classnames from 'classnames';

import './index.scss';

function Stepper({ steps, children = steps }) {
    return (
        <div className="stepper">
            {React.Children.map(children, (step, index) =>
                React.isValidElement(step) ?
                    React.cloneElement(step) :
                    <Step key={step.id} graphic={index} {...step} />
            )}
        </div>
    );
}

function Step({ graphic, label, completed, vertical, active }) {
    return (
        <span className="stepper__step" className={classnames('stepper__step', {
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

Stepper.Step = Step;

export { Stepper as default, Stepper, Step };