const router = require('express').Router();

module.exports = ({ Ticket }) => {
    router.post('/payments', async (req, res) => {    
        try {
            return Ticket.create({
                user,
                plan: req.body.plan,
                payment: {
                    id: req.body.object.id,
                    paid: true,
                    date: new Date()
                }
            });
        } catch (error) {
            logError(error);
            res.sendStatus(500);
        }
    });

    return router;
};