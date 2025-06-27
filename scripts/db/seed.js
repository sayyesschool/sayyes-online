import config from 'config';
import core from 'core';
import DB from 'db';

import * as data from './data';

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
        Task,
        Vocabulary,
        LexemeRecord
    }
} = core(config);

const db = DB(config);

await db.connect();
await db.drop();

await Assignment.create(data.assignments);
await Comment.create(data.comments);
await Course.create(data.courses);
await Data.create(data.data);
await Enrollment.create(data.enrollments);
await Exercise.create(data.exercises);
await Lexeme.create(data.lexemes);
await LexemeRecord.create(data.records);
await Membership.create(data.memberships);
await Meeting.create(data.meetings);
await Payment.create(data.payments);
await Request.create(data.requests);
await Registration.create(data.registrations);
await Room.create(data.rooms);
await Task.create(data.tasks);
await User.create(data.users);
await Vocabulary.create(data.vocabularies);

console.log('DB seeded');

await db.disconnect();

process.exit(0);