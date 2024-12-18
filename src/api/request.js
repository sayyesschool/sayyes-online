import { Router } from 'express';

export default ({ models: { Request } }) => {
    const router = Router();

    router.post('/', async (req, res) => {
        const request = await Request.create(req.body);

        res.json({
            ok: true,
            message: 'Заявка создана',
            data: request
        });
    });

    return router;
};