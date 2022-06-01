import Video from 'twilio-video';
import { Header, List, Segment, Text } from '@fluentui/react-northstar';

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
                <Segment>
                    <Header
                        content="Ваш браузер или устройство не поддерживается"
                    />

                    <Text>Установите один из поддерживаемых браузеров:</Text>

                    <List>
                        {browsers.map(browser =>
                            <List.Item
                                as="a"
                                href={browser.url}
                                header={browser.title}
                            />
                        )}
                    </List>
                </Segment>
            </div>
        );
    }

    return children;
}
