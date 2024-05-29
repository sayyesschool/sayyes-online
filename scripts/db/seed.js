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
        Room,
        User,
        Vocabulary,
        LexiconRecord
    }
} = core(config);

await db.connect('mongodb://localhost:27017/sayyes');

await db.drop();

await Room.create(data.rooms);

const learner = await User.create(data.learner);

const teacher = await User.create(data.teacher);

const editor = await User.create(data.editor);

const exercise = await Exercise.create(data.exercise);

const course = await Course.create(data.course);

const enrollment = await Enrollment.create({
    status: 'active',
    learnerId: learner.id,
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

lexemes.forEach(async lexeme => {
    await LexiconRecord.create({
        lexemeId: lexeme.id,
        learnerId: learner.id
    });
});

await Vocabulary.create({
    title: 'Мой словарь',
    learnerId: learner.id,
    teacherId: teacher.id,
    lexemeIds: lexemes.map(l => l.id)
});

console.log('DB seeded');

await db.disconnect();