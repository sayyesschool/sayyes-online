export default ({
    clients: { captcha }
}) => ({
    async post(req, res) {
        const { token } = req.body;

        const data = await captcha.verify(token);

        return res.json(data);
    }
});