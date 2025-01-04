import { Router } from 'express';

export default ({
    models: { Request },
    services: { Mail }
}) => {
    const router = Router();

    router.post('/', async (req, res) => {
        const {
            name,
            email,
            questions,
            source,
            utm
        } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Не указано имя' });
        }

        if (!email) {
            return res.status(400).json({ error: 'Не указан адрес эл. почты' });
        }

        if (!questions) {
            return res.status(400).json({ error: 'Не переданы вопросы' });
        }

        const level = getLevel(questions);

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
                level,
                questions
            }
        });

        await Mail.send({
            to: email,
            subject: 'Результаты теста',
            templateId: 6575919,
            variables: {
                level,
                questions
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

function getLevel(questions) {
    const { correct, incorrect } = questions.reduce((results, question) => {
        if (question.answer === question.answer) {
            results.correct.push(question);
        } else {
            results.incorrect.push(question);
        }

        return results;
    }, {
        correct: [],
        incorrect: []
    });

    const correctAnswers = correct.length;

    if (correctAnswers < 5) {
        return 'Beginner';
    } else if (correctAnswers < 10) {
        return 'Elementary';
    } else if (correctAnswers < 15) {
        return 'Pre-Intermediate';
    } else if (correctAnswers < 20) {
        return 'Intermediate';
    } else {
        return 'Upper-Intermediate';
    }
}

function getHtml({ name, email, questions, level }) {
    const output = `
        <html>
            <body style="font-family: sans-serif">
                <h1>Результаты теста</h1>
                <div>
                    <b>Имя:</b> ${name}
                </div>
                <div>
                    <b>Email:</b> ${email}
                </div>

                <h2>Ответы</h2>

                ${questions.map((question, index) => `
                    <div>
                        <b>${index + 1}</b>
                        <div>${question.content}</div>
                    </div>
                `).join('')}
            </body>
        </html>
    `;

    return output;
}