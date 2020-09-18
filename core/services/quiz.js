module.exports = Quiz => ({
    get: (...args) => {
        return Quiz.find(...args);
    },

    getOne: (...args) => {
        return Quiz.findOne(...args);
    },

    check: (quiz, answers) => {
        const results = quiz.questions.reduce((results, question, index) => {
            const answer = answers[index];

            if (question.answer === answer) {
                results.correct += 1;
            } else {
                results.incorrect += 1;
            }

            return results;
        }, {
            correct: 0,
            incorrect: 0,
            total: quiz.length
        });

        return results;
    }
});