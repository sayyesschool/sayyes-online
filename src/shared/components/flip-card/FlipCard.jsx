import { Card } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';

import styles from './FlipCard.module.scss';

/*
TODO: переписать без использования joy, разрулить баги со стилями
*/
export default function FlipCard({
    front,
    back,
    width = '250px',
    height = '250px',
    isCardFlip1,
    onFlip,

    children,
    ...props
}) {
    // const [isCardFlip, setIsCardFlip] = useState(isCardFlip1 ?? false);

    const onClick = () => {
        console.log('click');
        // setIsCardFlip(state => !state);
        onFlip?.();
    };

    const classNames = classnames(styles.card, {
        [styles.active]: isCardFlip1
    });

    return (
        <div className={styles.root} onClick={onClick}>
            <Card
                className={classNames} sx={{ width, height }}
                {...props}
            >
                <div className={styles.front}>
                    {front}
                </div>

                <div className={styles.back}>
                    {back}
                </div>

                {children}
            </Card>
        </div>
    );
}