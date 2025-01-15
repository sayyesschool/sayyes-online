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
    const { description, contact, channel, source, referrer, data, utm, captcha } = request;

    let html = '';

    html += `<b>Имя:</b> ${contact.name}<br>`;
    html += `<b>Телефон:</b> ${contact.phone}<br>`;

    if (contact.email)
        html += `<b>Электронная почта:</b> ${contact.email}<br>`;

    if (channel)
        html += `<b>Способ связи:</b> ${channel}<br>`;

    if (source)
        html += `<b>Источник:</b> ${source}<br>`;

    if (referrer)
        html += `<b>Сайт:</b> ${referrer}<br>`;

    if (description)
        html += `<b>Описание:</b> ${description}<br>`;

    if (data.format)
        html += `<b>Формат обучения:</b> $${data.format}<br>`;

    if (data.child) {
        html += `<b>Имя ребенка:</b> ${data.childName}<br>`;
        html += `<b>Возраст ребенка:</b> ${data.childAge}<br>`;
    }

    if (Object.values(utm).length) {
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

    if (captcha)
        html += `<br><b>CAPTCHA:</b> ${captcha ? 'Пройдена' : 'Не пройдена'}`;

    html += '';

    return html;
}