import { Router } from 'express';

export default ({
    config: { RECAPTCHA_SECRET_KEY }
}) => {
    const router = Router();

    router.post('/', async (req, res) => {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ success: false, error: 'Не указан токен' });
        }

        const data = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`, {
            method: 'POST'
        }).then(res => res.json());

        return res.json(data);
    });

    return router;
};