const { Router } = require('express');

const Controller = require('./controller');

module.exports = ({ Quiz }) => {
    const router = Router();
    const { quizzes, quiz } = Controller(Quiz);

    router.param('quiz', quiz.find);

    router.get('/', quizzes.get);
    router.route('/:quiz')
        .get(quiz.get)
        .post(quiz.post);

    return Router;
};