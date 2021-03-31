import React from 'react';
import Video from 'twilio-video';
import {
    Card,
    Icon,
    List,
    Typography
} from 'mdc-react';

const browsers = [
    { title: 'Chrome', url: 'https://www.google.ru/chrome' },
    { title: 'Firefox', url: 'https://www.mozilla.org/ru/firefox' },
    { title: 'Safari', url: 'https://www.apple.com/ru/safari' },
    { title: 'Edge', url: 'https://www.microsoft.com/ru-ru/edge' }
];

export default function UnsupportedBrowserWarning({ children }) {
    if (!Video.isSupported) {
        return (
            <div className="unsupported-browser-warning">
                <Card>
                    <Card.Header
                        graphic={<Icon>warning</Icon>}
                        title="Ваш браузер или устройство не поддерживается"
                    />

                    <Card.Section primary>
                        <Typography>Установите один из поддерживаемых браузеров:</Typography>

                        <List>
                            {browsers.map(browser =>
                                <List.Item
                                    element="a"
                                    href={browser.url}
                                    text={browser.title}
                                />
                            )}
                        </List>
                    </Card.Section>
                </Card>
            </div>
        );
    }

    return children;
}
