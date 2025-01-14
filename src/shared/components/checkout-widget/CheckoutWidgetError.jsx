import { Heading, Image, Text } from 'shared/ui-components';

import styles from './CheckoutWidget.module.scss';

export default function CheckoutWidgetSuccess({ error }) {
    const subject = encodeURIComponent('Ошибка на сайте');
    const body = encodeURIComponent(error?.message ?? '');
    const href = `mailto:club@sayyes.school?subject=${subject}&body=${body}`;

    return (
        <div className={styles.error}>
            <Image
                className={styles.image}
                src="https://static.sayes.ru/images/cat/cat-sad.png"
                alt=""
            />

            <Heading type="h3">Ошибка на сайте</Heading>
            <Text>Что-то пошло не так. Попробуйте выполнить действие еще раз. Если вновь будет ошибка, <a href={href}>напишите нам на почту</a>, мы исправим её как можно быстрее.</Text>

            <div>
                <Heading as="span" type="h5">Техническое описание:</Heading>

                <pre>
                    <code>{error?.message}</code>
                </pre>
            </div>
        </div>
    );
}