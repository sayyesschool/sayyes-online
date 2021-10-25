import {
    Avatar,
    Button,
    Card,
    Typography
} from 'mdc-react';

import Stepper from 'shared/components/stepper';

import './index.scss';

const contentByStatus = {
    processing: ProcessingContent,
    trial: TrialContent,
    payment: PaymentContent
};

const imageByStatus = {
    processing: 'cat-hi',
    trial: 'cat-teacher',
    payment: 'cat-goal'
};

export default function EnrollmentStatusCard({ enrollment }) {
    const { status } = enrollment;

    return (
        <Card className="enrollment-status-card">
            <Card.Section className="enrollment-status-card__section--graphic">
                <img src={`https://static.sayes.ru/images/cat/${imageByStatus[status]}.png`} alt="" />
            </Card.Section>

            <Card.Section className="enrollment-status-card__section--main">
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

                {React.createElement(contentByStatus[enrollment.status], {
                    enrollment
                })}
            </Card.Section>
        </Card>
    );
}

function ProcessingContent({ enrollment }) {
    return (
        <div className="processing-content">
            <Typography type="headline6">{enrollment.client.firstname}, спасибо за заявку. Мы Вам рады!</Typography>

            <Typography type="body1">Наш менеджер находится в поиске преподавателя под Ваш запрос. Совсем скоро он свяжется с Вами для организации бесплатного вводного урока.</Typography>
        </div>
    );
}

function TrialContent({ enrollment }) {
    return (
        <div className="trial-content">
            <Typography type="headline6">{enrollment.client.firstname}, мы подобрали Вам подходящего преподавателя!</Typography>

            <Typography type="body1">При подборе мы постарались учесть все Ваши предпочтения, но окончательный выбор за Вами, поэтому ждем Вас на бесплатном вводном уроке:</Typography>

            <Card className="lesson-card" outlined>
                <Card.Header
                    graphic={<Avatar src={enrollment.teacher.imageUrl} />}
                    title={enrollment.teacher.fullname}
                    subtitle={'2 февраля в 13:00'}
                />
            </Card>

            <Typography type="body1">В указанное время войдите, пожалуйста, на нашу платформу и нажмите на кнопку ниже "Войти в класс". Удачного урока!</Typography>

            <Button element="a" href={enrollment.classUrl} unelevated>Войти в класс</Button>
        </div>
    );
}

function PaymentContent({ enrollment }) {
    return enrollment?.currentPayment?.status === 'pending' ?
        (
            <div className="payment-content">
                <Typography type="headline6">Ожидание поступления платежа</Typography>

                <Typography type="body1">Вы выставили счет на оплату, но средства на Ваш счет в Личном кабинете еще не поступили. В момент пополнения баланса Вы получите уведомление. Если через 1–2 мин. средства не поступили на Ваш баланс, пожалуйста, свяжитесь с нашим менеджером.</Typography>
            </div>
        )
        :
        (
            <div className="payment-content">
                <Typography type="headline6">{enrollment.client.firstname}, остался всего один шаг: оплатить обучение.</Typography>

                <Typography type="body1">Обратите внимание, что первую оплату нужно внести не позднее чем за сутки до назначенного времени первого урока. Если по какой-то причине Вы ещё не определились с датой и временем первого занятия — не беспокойтесь, Ваш менеджер помнит об этом и перезвонит Вам в ближайшее время.</Typography>

                <Typography type="body1">Да, и загляните, пожалуйста в свою электронную почту — мы выслали Вам информацию организационного характера, с которой желательно ознакомиться до начала обучения.</Typography>

                <Typography type="body1">Мы очень рады, что Вы выбрали нашу школу для изучения английского языка. Уверены, Вам у нас понравится!</Typography>
            </div>
        );
}