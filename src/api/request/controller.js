export default ({
    config: { EMAIL_DOMAIN },
    clients: { hh, teams },
    models: { Request },
    services: { Mail }
}) => ({
    post: async (req, res) => {
        const {
            type,
            contact,
            channel,
            source,
            data,
            captcha,
            test
        } = req.body;

        if (test === 'test') {
            return res.json({
                ok: true
            });
        }

        if (!contact?.phone) throw {
            code: 400,
            message: 'Не указан телефон'
        };

        const request = await Request.create({
            type,
            contact,
            channel,
            source,
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

        await teams.sendAdaptiveCard(request);

        const hhRequest = await hh.addStudyRequest({
            type: request.typeLabel,
            fullName: request.contact.name,
            phone: `+${request.contact.phone}`,
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
    }
});

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