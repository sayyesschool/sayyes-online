import { Router } from 'express';

export default ({
    models: { Data, Request },
    services: { Mail }
}) => {
    const router = Router();

    router.get('/', async (req, res) => {
        const data = await Data.get('test');

        res.json({
            ok: true,
            data
        });
    });

    router.post('/', async (req, res) => {
        const {
            name,
            email,
            goal,
            answers,
            source,
            utm
        } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Не указано имя' });
        }

        if (!email) {
            return res.status(400).json({ error: 'Не указан адрес эл. почты' });
        }

        if (!answers) {
            return res.status(400).json({ error: 'Не переданы ответы' });
        }

        const questions = await Data.get('test');

        const level = getLevel(questions, answers);
        const results = getResults(questions, answers);

        const request = await Request.create({
            description: 'Прохождение теста на сайте',
            contact: {
                name,
                email
            },
            channel: Request.Channel.Test,
            source,
            utm,
            data: {
                goal,
                level
            }
        });

        await Mail.send({
            to: email,
            subject: 'Результаты теста',
            templateId: 6575919,
            variables: {
                level,
                results
            }
        });

        res.json({
            ok: true,
            data: {
                requestId: request.id
            }
        });
    });

    return router;
};

function getLevel(questions, answers) {
    const maxLevel = questions.reduce((acc, question) => Math.max(acc, question.level), 0);
    const answeredCorrectly = questions.reduce((acc, question, index) => {
        const answer = answers[index];
        const correctAnswer = question.options.find(answer => answer.correct)?.content;

        if (answer === correctAnswer) {
            acc.push(question);
        }

        return acc;
    }, []);

    const maxScore = questions.reduce((acc, question) => acc + question.level, 0);
    const rawScore = answeredCorrectly.reduce((acc, question) => acc + question.level, 0);
    const levelByScore = Math.round((rawScore / maxScore) * maxLevel);

    const answersByLevel = answeredCorrectly.reduce((acc, question) => {
        if (!acc[question.level]) {
            acc[question.level] = 0;
        }

        acc[question.level] += 1;

        return acc;
    }, {});

    const levelByAnswers = Object.entries(answersByLevel).reduce((acc, [level, count]) => {
        if (count >= 4 && level - acc === 1) {
            return Number(level);
        } else {
            return acc;
        }
    }, 0);

    const finalLevel = Math.min(levelByAnswers, levelByScore);

    switch (finalLevel) {
        case 0:
            // fallthrough
        case 1:
            return 'Beginner';
        case 2:
            return 'Elementary';
        case 3:
            return 'Pre-Intermediate';
        case 4:
            return 'Intermediate';
        case 5:
            return 'Upper-Intermediate';
        case 6:
            return 'Advanced';
    }
}

function getResults(questions, answers) {
    return questions.map((question, index) => {
        const answer = answers[index];
        const correctAnswer = question.answers.find(answer => answer.correct)?.content;
        const isCorrect = answer === correctAnswer;

        return {
            ...question,
            answer,
            correctAnswer,
            isCorrect
        };
    });
}