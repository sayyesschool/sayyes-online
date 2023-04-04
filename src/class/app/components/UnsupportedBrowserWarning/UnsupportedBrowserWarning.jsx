import Video from 'twilio-video';

import { Heading, List, Surface, Text } from 'shared/ui-components';

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
                <Surface>
                    <Heading
                        content="Ваш браузер или устройство не поддерживается"
                    />

                    <Text>Установите один из поддерживаемых браузеров:</Text>

                    <List>
                        {browsers.map(browser =>
                            <List.Item
                                as="a"
                                href={browser.url}
                                Heading={browser.title}
                            />
                        )}
                    </List>
                </Surface>
            </div>
        );
    }

    return children;
}