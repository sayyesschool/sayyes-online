import { Button, MenuButton } from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';
import Stepper from 'shared/components/stepper';
import { statusOptions } from 'shared/data/enrollment';

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
                trigger={
                    <Button
                        icon={<Icon>more_vert</Icon>}
                        text
                        iconOnly
                    />
                }
                align="end"
                menu={statusOptions.map(status => ({
                    ...status,
                    activated: status.value === enrollment.status,
                    onClick: () => onUpdate({ status: status.value })
                }))}
            />
        </section>
    );
}