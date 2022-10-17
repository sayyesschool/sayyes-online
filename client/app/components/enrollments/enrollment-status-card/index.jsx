import { createElement } from 'react';

import { Box, Segment } from 'shared/ui-components';
import Stepper from 'shared/components/stepper';

import PaymentContent from './payment-content';
import ProcessingContent from './processing-content';
import TrialContent from './trial-content';

import './index.scss';

const contentByStatus = {
    payment: PaymentContent,
    processing: ProcessingContent,
    trial: TrialContent
};

const imageByStatus = {
    processing: 'cat-hi',
    trial: 'cat-teacher',
    payment: 'cat-goal'
};

export default function EnrollmentStatusCard({ enrollment }) {
    const { status } = enrollment;

    return (
        <Segment className="enrollment-status-card">
            <Box className="enrollment-status-card__section--graphic">
                <img src={`${STORAGE_URL}/assets/images/cat/${imageByStatus[status]}.png`} alt="" />
            </Box>

            <Box className="enrollment-status-card__section--main">
                <Stepper>
                    <Stepper.Step
                        graphic={1}
                        label="Обработка заявки"
                        active={status === 'processing'}
                        completed={status === 'trial' || status === 'payment'}
                    />

                    <Stepper.Divider />

                    <Stepper.Step
                        graphic={2}
                        label="Вводный урок"
                        active={status === 'trial'}
                        completed={status === 'payment'}
                    />

                    <Stepper.Divider />

                    <Stepper.Step
                        graphic={3}
                        label="Оплата обучения"
                        active={status === 'payment'}
                    />
                </Stepper>

                {createElement(contentByStatus[enrollment.status] || null, {
                    enrollment
                })}
            </Box>
        </Segment>
    );
}