export default () => ({
    async sendAdaptiveCard(request) {
        return await fetch('https://prod-31.southeastasia.logic.azure.com:443/workflows/4ea19cf2f26a4faf811783bbd195de47/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6_8lwQt6SwsvW37ABMf0ydJwFWPzMmNPT5LwBwP8ogk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type:'message',
                attachments: [
                    {
                        contentType: 'application/vnd.microsoft.card.adaptive',
                        content: {
                            $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
                            type: 'AdaptiveCard',
                            version: '1.3',
                            body: [
                                {
                                    type: 'TextBlock',
                                    size: 'ExtraLarge',
                                    weight: 'Bolder',
                                    text: request.typeLabel
                                },
                                {
                                    type: 'Container',
                                    items: [
                                        {
                                            type: 'TextBlock',
                                            text: 'Контакт',
                                            size: 'Large',
                                            weight: 'Bolder'
                                        },
                                        {
                                            type: 'FactSet',
                                            facts: [
                                                {
                                                    title: 'Имя:',
                                                    value: request.contact.name
                                                },
                                                {
                                                    title: 'Телефон:',
                                                    value: request.contact.phone
                                                },
                                                {
                                                    title: 'Электронная почта:',
                                                    value: request.contact.email
                                                }
                                            ]
                                        }
                                    ]
                                },
                                request.data.child && {
                                    type: 'Container',
                                    items: [
                                        {
                                            type: 'TextBlock',
                                            text: 'Ребенок',
                                            size: 'Large',
                                            weight: 'Bolder'
                                        },
                                        {
                                            type: 'FactSet',
                                            facts: [
                                                {
                                                    title: 'Имя:',
                                                    value: request.data.childName
                                                },
                                                {
                                                    title: 'Возраст:',
                                                    value: request.data.childAge
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    type: 'Container',
                                    items: [
                                        {
                                            type: 'TextBlock',
                                            text: 'Данные',
                                            size: 'Large',
                                            weight: 'Bolder'
                                        },
                                        {
                                            type: 'FactSet',
                                            facts: [
                                                request.data.format && {
                                                    title: 'Формат:',
                                                    value: request.data.format
                                                },
                                                request.channel && {
                                                    title: 'Способ связи:',
                                                    value: request.channelLabel
                                                },
                                                request.source && {
                                                    title: 'Источник:',
                                                    value: request.sourceLabel
                                                },
                                                request.referrer && {
                                                    title: 'Сайт:',
                                                    value: request.referrer
                                                },
                                                request.note && {
                                                    title: 'Примечание:',
                                                    value: request.note
                                                }
                                            ].filter(Boolean)
                                        }
                                    ]
                                },
                                request.hasUTM && {
                                    type: 'Container',
                                    items: [
                                        {
                                            type: 'TextBlock',
                                            text: 'UTM',
                                            size: 'Large',
                                            weight: 'Bolder'
                                        },
                                        {
                                            type: 'FactSet',
                                            facts: [
                                                {
                                                    title: 'Source:',
                                                    value: request.utm.source
                                                },
                                                {
                                                    title: 'Medium:',
                                                    value: request.utm.medium
                                                },
                                                {
                                                    title: 'Campaign:',
                                                    value: request.utm.campaign
                                                },
                                                {
                                                    title: 'Content:',
                                                    value: request.utm.content
                                                }
                                            ]
                                        }
                                    ]
                                },
                                request.captcha && {
                                    type: 'Container',
                                    items: [
                                        {
                                            type: 'TextBlock',
                                            text: 'CAPTCHA',
                                            size: 'Large',
                                            weight: 'Bolder'
                                        },
                                        {
                                            type: 'FactSet',
                                            facts: [
                                                {
                                                    title: 'Пройдена:',
                                                    value: request.captcha ? 'Да' : 'Нет'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ].filter(Boolean),
                            actions: [
                                {
                                    type: 'Action.OpenUrl',
                                    title: 'Посмотреть',
                                    url: 'https://sayes.t8s.ru/StudyRequest/Search'
                                }
                            ]
                        }
                    }
                ]
            })
        });
    }
});