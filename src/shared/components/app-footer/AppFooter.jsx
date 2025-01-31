import { LOGO_URL } from 'shared/constants';
import { Flex, Link, Text } from 'shared/ui-components';

import styles from './AppFooter.module.scss';

const links = [
    { href: '/agreement', text: 'Пользовательское соглашение' },
    { href: '/policy', text: 'Политика конфиденциальности' },
    { href: '/offer', text: 'Публичная оферта' },
    { href: '/rules', text: 'Правила использования' }
];

export default function AppFooter({ logo, logoUrl }) {
    return (
        <footer className={styles.root}>
            <div className={styles.container}>
                <a className={styles.logo} href="/">
                    {logo || <img src={logoUrl || LOGO_URL} alt="Логотип Say Yes" />}
                </a>

                <ul className={styles.links}>
                    {links.map(({ href, text }, index) =>
                        <li key={index} className="list-item">
                            <Link
                                href={href}
                                content={text}
                                color="neutral"
                                level="body-sm"
                                underline="hover"
                            />
                        </li>
                    )}
                </ul>

                <Flex dir="column" gap="xxs">
                    <Text type="body-sm">© 2013–2024 SAY&nbsp;YES!</Text>
                    <Text type="body-sm">Все права защищены</Text>
                </Flex>
            </div>
        </footer>
    );
}