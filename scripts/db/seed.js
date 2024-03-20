const config = require('../../src/config');
const db = require('../../src/db');
const core = require('../../src/core');

const { models: { Room, User } } = core(config);

(async () => {
    await db.connect('mongodb://localhost:27017/sayyes');

    await Room.create([
        { name: 'A', active: true }
    ]);

    await User.create([
        {
            firstname: 'Teacher',
            email: 'teacher@sayyes.school',
            password: '2406YiS2013',
            role: 'teacher'
        }
    ]);

    console.log('DB seeded');

    await db.disconnect();
})();