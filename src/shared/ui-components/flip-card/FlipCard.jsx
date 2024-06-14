import { useState } from 'react';

import { Card, IconButton, Image } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';

import styles from './FlipCard.module.scss';

/*
TODO:
1. прокидывать контент для front и back как jsx элемент, чтобы сделать компонент универсальным (аудио, видео, текст)
2. переписать без использования joy, разрулить баги со стилями
*/
export default function FlipCard({
    frontText = 'Front',
    backText = 'Back',
    width = '250px',
    height = '250px',
    isCardFlip1,
    onFlip,
    ...props
}) {
    // const [isCardFlip, setIsCardFlip] = useState(isCardFlip1 ?? false);
    const classNames = classnames(styles.card, { [styles.active]: isCardFlip1 });

    const onClick = () => {
        console.log('click');
        // setIsCardFlip(state => !state);
        onFlip?.();
    };

    return (
        <div className={styles.scene} onClick={onClick}>
            <Card className={classNames} sx={{ width, height }} {...props}>
                <Card.Content className={styles.front}>
                    <Card.Text level="title-lg">{frontText}</Card.Text>
                </Card.Content>

                <Card.Content className={styles.back}>
                    <Card.Text level="title-lg">{backText}</Card.Text>
                </Card.Content>
            </Card>
        </div>
    );
}