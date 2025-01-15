import { Router } from 'express';

export default ({
    config: { EMAIL_DOMAIN },
    clients: { hh },
    models: { Request },
    services: { Mail }
}) => {
    const router = Router();

    router.post('/', async (req, res) => {
        console.log(req.body);

        if (!req.body.contact.phone) throw {
            code: 400,
            message: 'Не указан телефон'
        };

        const request = await Request.create({
            referrer: req.get('Referrer'),
            ...req.body
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

        const hhRequest = await hh.addStudyRequest({
            type: request.typeLabel,
            description: request.description,
            name: request.contact.name,
            phone: request.contact.phone,
            email: request.contact.email
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
    const { description, contact, channel, source, referrer, data, utm, recaptcha } = request;

    let html = '';

    html += `<b>Имя:</b> ${contact.name}<br>`;
    html += `<b>Телефон:</b> ${contact.phone}<br>`;

    if (contact.email)
        html += `<b>Электронная почта:</b> ${contact.email}<br>`;

    if (data.format)
        html += `<b>Формат обучения:</b> $${data.format}<br>`;

    if (channel)
        html += `<b>Способ связи:</b> ${channel}<br>`;

    if (source)
        html += `<b>Источник:</b> ${source}<br>`;

    if (referrer)
        html += `<b>Сайт:</b> ${referrer}<br>`;

    if (description)
        html += `<b>Описание:</b> ${description}<br>`;

    if (Object.keys(utm).length) {
        html += '<br>UTM-метки:<br>';
        if (utm.source)
            html += `<b>Source:</b> ${utm.source}<br>`;
        if (utm.medium)
            html += `<b>Medium:</b> ${utm.medium}<br>`;
        if (utm.campaign)
            html += `<b>Campaign:</b> ${utm.campaign}<br>`;
        if (utm.content)
            html += `<b>Content:</b> ${utm.content}<br>`;
    }

    if (recaptcha)
        html += `<br><b>reCAPTCHA:</b> ${recaptcha.success ? `Пройдена (${recaptcha.score})` : 'Не пройдена'}`;

    html += '';

    return html;
}