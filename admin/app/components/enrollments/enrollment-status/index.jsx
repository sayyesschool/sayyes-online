import React from 'react';
import {
    Icon
} from 'mdc-react';

import Stepper from 'shared/components/stepper';
import MenuButton from 'shared/components/menu-button';

import { statuses } from 'app/data/enrollment';

import './index.scss';

export default function EnrollmentStatus({ enrollment, onUpdate }) {
    const { status } = enrollment;

    return (
        <section className="enrollment-status">
            <Stepper>
                <Stepper.Step
                    graphic={<Icon>pending</Icon>}
                    label="Обработка"
                    active={status === 'processing'}
                    completed={status === 'trial' || status === 'payment'}
                />

                <Stepper.Divider />

                <Stepper.Step
                    graphic={<Icon>event_available</Icon>}
                    label="Пробный урок"
                    active={status === 'trial'}
                    completed={status === 'payment'}
                />

                <Stepper.Divider />

                <Stepper.Step
                    graphic={<Icon>payment</Icon>}
                    label="Оплата"
                    active={status === 'payment'}
                />

                <Stepper.Divider />

                <Stepper.Step
                    graphic={<Icon>school</Icon>}
                    label="Обучение"
                    active={status === 'active'}
                />

                <Stepper.Divider />

                <Stepper.Step
                    graphic={<Icon>check_circle</Icon>}
                    label="Завершено"
                    active={status === 'completed'}
                />
            </Stepper>

            <MenuButton
                icon="more_vert"
                items={statuses.map(status => ({
                    ...status,
                    activated: status.value === enrollment.status,
                    onClick: () => onUpdate({ status: status.value })
                }))}
                menuProps={{ top: true, right: true }}
                listProps={{ dense: true }}
            />
        </section>
    );
}