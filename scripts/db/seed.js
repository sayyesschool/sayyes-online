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
        Lexeme,
        Meeting,
        Room,
        User,
        Vocabulary,
        LexemeRecord
    }
} = core(config);

await db.connect(process.env.DB_CONNECTION_STRING);

await db.drop();

await Room.create(data.rooms);

const [
    learner,
    manager,
    member,
    teacher
] = await User.create([
    data.learner,
    data.manager,
    data.member,
    data.teacher
]);

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
    hostId: teacher.id,
    registrations: meeting.registrations.map(registration => ({
        ...registration,
        userId: member.id
    }))
})));

console.log('DB seeded');

await db.disconnect();