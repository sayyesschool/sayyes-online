import config from 'config';
import core from 'core';
import db from 'db';

import * as data from './seed-data';

const {
    models: {
        Assignment,
        Comment,
        Enrollment,
        Exercise,
        Course,
        Data,
        Lexeme,
        Meeting,
        Membership,
        Payment,
        Registration,
        Request,
        Room,
        User,
        Vocabulary,
        LexemeRecord
    }
} = core(config);

await db.connect(process.env.DB_CONNECTION_STRING);

await db.drop();

const [
    learner,
    manager,
    teacher
] = await User.create([
    data.learner,
    data.manager,
    data.teacher
]);

await Room.create(data.rooms);

const exercise = await Exercise.create(data.exercise);

const course = await Course.create(data.course);

const enrollment = await Enrollment.create({
    status: 'active',
    learnerId: learner.id,
    managerId: manager.id,
    teacherId: teacher.id,
    courseIds: [course.id]
});

await Assignment.create({
    ...data.assignment,
    exerciseIds: [exercise.id],
    enrollmentId: enrollment.id,
    learnerId: learner.id,
    teacherId: teacher.id
});

await Comment.create({
    content: 'Comment',
    authorId: learner.id,
    itemId: exercise.id
});

const lexemes = await Lexeme.create(data.lexemes);

await LexemeRecord.create(lexemes.map(lexeme => ({
    lexemeId: lexeme.id,
    learnerId: learner.id
})));

await Vocabulary.create([
    {
        ...data.builtInVocabulary,
        published: true,
        lexemeIds: lexemes.slice(0, 2).map(l => l.id)
    },
    {
        ...data.customVocabulary,
        published: true,
        learnerId: learner.id,
        lexemeIds: lexemes.slice(3, 10).map(l => l.id)
    }
]);

await Meeting.create(data.meetings.map(meeting => ({
    ...meeting,
    hostId: teacher.id
})));

await Request.create(data.requests.map(request => ({
    ...request
})));

await Payment.create(data.payments.map(payment => ({
    ...payment,
    userId: learner.id
})));

await Membership.create(data.memberships.map(membership => ({
    ...membership,
    userId: learner.id
})));

await Data.create(data.data);

console.log('DB seeded');

await db.disconnect();

process.exit(0);