import { Text } from 'shared/ui-components';

export default function ProcessingContent({ enrollment }) {
    return (
        <div className="processing-content">
            <Text as="p" size="large">{enrollment.learner.firstname}, спасибо за заявку. Мы Вам рады!</Text>

            <Text as="p">Наш менеджер находится в поиске преподавателя под Ваш запрос. Совсем скоро он свяжется с Вами для организации бесплатного вводного урока.</Text>
        </div>
    );
}