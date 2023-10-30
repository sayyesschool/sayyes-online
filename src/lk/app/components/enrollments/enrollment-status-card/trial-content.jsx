import { Avatar, Button, Card, Flex, Text } from 'shared/ui-components';

export default function TrialContent({ enrollment }) {
    return (
        <div className="trial-content">
            <Text as="p" size="large">{enrollment.learner.firstname}, мы подобрали Вам подходящего преподавателя!</Text>

            <Text as="p">При подборе мы постарались учесть все Ваши предпочтения, но окончательный выбор за Вами, поэтому ждем Вас на бесплатном вводном уроке:</Text>

            <Card className="lesson-card" elevated ghost>
                <Flex gap="gap.small" vAlign="center">
                    <Avatar
                        image={enrollment.teacher.imageUrl}
                        name={enrollment.teacher.fullname}
                        size="large"
                    />

                    <Flex column>
                        <Text content={enrollment.teacher.fullname} weight="bold" />
                        <Text content={'2 февраля в 13:00'} />
                    </Flex>
                </Flex>
            </Card>

            <Text as="p">В указанное время войдите, пожалуйста, на нашу платформу и нажмите на кнопку ниже "Войти в класс". Удачного урока!</Text>

            <Button as="a" href={enrollment.classUrl} primary>Войти в класс</Button>
        </div>
    );
}