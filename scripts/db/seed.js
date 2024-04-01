const config = require('../../src/config');
const db = require('../../src/db');
const core = require('../../src/core');

const { models: { Enrollment, Room, User } } = core(config);

(async () => {
    await db.connect('mongodb://localhost:27017/sayyes');

    await Room.create([
        { name: 'A', active: true }
    ]);

    const learner = await User.create([
        {
            firstname: 'Ученик',
            email: 'learner@sayyes.school',
            password: '2406YiS2013',
            role: 'learner'
        }
    ]);

    const teacher = await User.create([
        {
            firstname: 'Учитель',
            email: 'teacher@sayyes.school',
            password: '2406YiS2013',
            role: 'teacher'
        }
    ]);

    await Enrollment.create([
        {
            learnerId: learner.id,
            teacherId: teacher.id,
        }
    ]);

    console.log('DB seeded');

    await db.disconnect();
})();