import { useRouteMatch } from 'react-router-dom';

import NavBar from 'shared/components/nav-bar';

import styles from './AppNav.module.scss';

export default function AppNav({ items, orientation, invertedColors, ...props }) {
    const match = useRouteMatch('/:path?');

    return (
        <div className={styles.root}>
            <NavBar
                className={styles.list}
                items={items}
                selectedItemValue={match.url}
                orientation={orientation}
                invertedColors={invertedColors}
                {...props}
            />
        </div>
    );
}