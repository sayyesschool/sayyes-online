import { Router } from 'express';

export default ({
    config: { RECAPTCHA_SECRET_KEY }
}) => {
    const router = Router();

    router.post('/', async (req, res) => {
        const { action, token } = req.body;

        if (!action) {
            return res.status(400).json({ error: 'Не указано действие' });
        }

        if (!token) {
            return res.status(400).json({ error: 'Не указан токен' });
        }

        if (action === 'verify') {
            const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
                method: 'POST',
                body: JSON.stringify({
                    secret: RECAPTCHA_SECRET_KEY,
                    response: token
                })
            });

            const data = await response.json();

            console.log(data);

            if (!data.success) {
                return res.status(400).json({ error: 'Подтверждение не пройдено' });
            }
        }
    });

    return router;
};