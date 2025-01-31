import { Heading, Image, Text } from 'shared/ui-components';

import styles from './CheckoutWidget.module.scss';

export default function CheckoutWidgetSuccess() {
    return (
        <div className={styles.success}>
            <Image src="https://static.sayes.ru/images/cat/cat-thumbup.png" alt="" />
            <Heading type="h3">Оплата прошла успешно</Heading>
            <Text type="title-lg">Спасибо за покупку!</Text>
            <Text type="title-md">Вам на почту отправлено письмо с дальнейшими инструкциями.</Text>
        </div>
    );
}