import { Router } from 'express';

export default ({
    config: { EMAIL_DOMAIN },
    clients: { hh },
    models: { Request },
    services: { Mail }
}) => {
    const router = Router();

    router.post('/', async (req, res) => {
        const {
            type,
            contact,
            channel,
            data,
            captcha
        } = req.body;

        if (!contact?.phone) throw {
            code: 400,
            message: 'Не указан телефон'
        };

        const request = await Request.create({
            type,
            contact,
            channel,
            data,
            referrer: req.get('Referrer'),
            captcha
        });

        await Mail.send({
            from: {
                name: 'CRM',
                email: `crm@${EMAIL_DOMAIN}`
            },
            to: `requests@${EMAIL_DOMAIN}`,
            subject: request.typeLabel || 'Заявка',
            html: getHtml(request)
        });

        await sendAdaptiveCard(request);

        const hhRequest = await hh.addStudyRequest({
            type: request.typeLabel,
            fullName: request.contact.name,
            phone: request.contact.phone,
            email: request.contact.email,
            description: request.note,
            office: request.data.format,
            maturity: request.data.child && `Дети ${request.data.childAge} лет`
        });

        request.hhid = hhRequest.Id;

        await request.save();

        res.json({
            ok: true,
            message: 'Заявка создана',
            data: request
        });
    });

    return router;
};

function getHtml(request) {
    const {
        description,
        contact,
        channel,
        channelLabel,
        source,
        sourceLabel,
        referrer,
        data,
        utm,
        captcha
    } = request;

    let html = '';

    html += `<b>Имя:</b> ${contact.name}<br>`;
    html += `<b>Телефон:</b> ${contact.phone}<br>`;

    if (contact.email)
        html += `<b>Электронная почта:</b> ${contact.email}<br>`;

    if (data.child) {
        html += `<b>Имя ребенка:</b> ${data.childName}<br>`;
        html += `<b>Возраст ребенка:</b> ${data.childAge}<br>`;
    }

    if (data.format)
        html += `<b>Формат обучения:</b> ${data.format}<br>`;

    if (channel)
        html += `<b>Способ связи:</b> ${channelLabel}<br>`;

    if (source)
        html += `<b>Источник:</b> ${sourceLabel}<br>`;

    if (referrer)
        html += `<b>Сайт:</b> ${referrer}<br>`;

    if (description)
        html += `<b>Описание:</b> ${description}<br>`;

    if (request.hasUTM) {
        html += '<b>UTM-метки:</b><br>';
        if (utm.source)
            html += `<b>Source:</b> ${utm.source}<br>`;
        if (utm.medium)
            html += `<b>Medium:</b> ${utm.medium}<br>`;
        if (utm.campaign)
            html += `<b>Campaign:</b> ${utm.campaign}<br>`;
        if (utm.content)
            html += `<b>Content:</b> ${utm.content}<br>`;
    }

    if (captcha)
        html += `<b>CAPTCHA:</b> ${captcha ? 'Пройдена' : 'Не пройдена'}<br>`;

    return html;
}

async function sendAdaptiveCard(request) {
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