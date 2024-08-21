import { Box, Card, Surface } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';

import styles from './FlipCard.module.scss';

/*
TODO: переписать без использования joy, разрулить баги со стилями
*/
export default function FlipCard({
    front,
    back,
    flipped,
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

    const classNames = classnames(styles.root, {
        [styles.flipped]: flipped
    });

    return (
        <div
            className={classNames}
            onClick={onClick}
            {...props}
        >
            <div className={styles.card}>
                <Box
                    className={styles.front}
                    bgcolor="neutral.100"
                >
                    {front}
                </Box>

                <Box
                    className={styles.back}
                    bgcolor="primary.100"
                >
                    {back}
                </Box>

                {children}
            </div>
        </div>
    );
}