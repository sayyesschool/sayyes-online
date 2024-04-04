const config = require('../../src/config');
const db = require('../../src/db');
const core = require('../../src/core');

const {
    models: {
        Assignment,
        Comment,
        Enrollment,
        Exercise,
        Course,
        Room,
        User
    }
} = core(config);

(async () => {
    await db.connect('mongodb://localhost:27017/sayyes');

    await db.drop();

    await Room.create([
        { name: 'A', active: true }
    ]);

    const learner = await User.create({
        firstname: 'Ученик',
        email: 'learner@sayyes.school',
        password: '2406YiS2013',
        role: 'learner'
    });

    const teacher = await User.create({
        firstname: 'Учитель',
        email: 'teacher@sayyes.school',
        password: '2406YiS2013',
        role: 'teacher'
    });

    const exercise = await Exercise.create({
        _id: '660af90c20a265092f53b487',
        courseId : '5fb265487ef0653994e53a26',
        sectionId : '64b6c8b8368b0620f3298514',
        description : '<p class="directions">Complete the conversations. Use the conversations above to help you. Then practice with a partner. Use your own names.</p><p>Заполните пропуски, используя диалоги выше. Затем попрактикуйте данные диалоги с партнёром, используя свои собственные имена.</p>',
        items : [
            {
                _id : 'a43ffd3b-0624-4c67-9b75-f04e45ddc80a',
                type : 'fib',
                version : 1,
                props : {
                    'content' : '<p class="overline"><strong>These people are friends:</strong></p><blockquote class="dialog"><p><i>A</i> Hi, Pat. How are you?</p><p><i>B</i> I\'m fine. How are you?</p><p><i>A</i> Good, {thanks}:{c6acc252}.</p></blockquote><hr><p></p><blockquote class="dialog"><p><i>A</i> Good {morning}:{1531a523}, Anna.</p><p><i>B</i> Hi, Dan. {how}:{a3c657e4} are you?</p><p><i>A</i> I\'m {fine}:{2e061e31}, thanks.</p></blockquote><p></p><p class="overline"><strong>These people meet for the first time:</strong></p><blockquote class="dialog"><p><i>A</i> Hello. {i\'m}:{a64ac416} Chris Evans.</p><p><i>B</i> Hi. I\'m Grace Song.</p><p><i>A</i> {nice}:{8b698022} to meet you, Grace.</p></blockquote><hr><p></p><blockquote class="dialog"><p><i>A</i> Hello. I\'m Sarah.</p><p><i>B</i> Nice to meet {you}:{88f706f2}. I\'m Alan.</p><p><i>A</i> Nice to {meet}:{b5873c9e} you.</p></blockquote>',
                    'required' : false
                }
            }
        ]
    });

    const course = await Course.create({
        _id: '5fb265487ef0653994e53a26',
        title : 'Course',
        description : '<p>Course description</p>',
        units : [
            {
                _id: '64b6c779368b0620f32984ed',
                title : 'Unit 1',
                description : '<p>Unit 1 description</p>',
                _lessons : [
                    '64b6c782368b0620f32984f2'
                ]
            }
        ],
        lessons : [
            {
                _id: '64b6c782368b0620f32984f2',
                title : 'Lesson 1',
                description : '<p>Lesson 1 description</p>',
                _unit : '64b6c779368b0620f32984ed',
                _sections : [
                    '64b6c8b8368b0620f3298514'
                ]
            }
        ],
        sections : [
            {
                _id : '64b6c8b8368b0620f3298514',
                title : 'After you watch',
                description : '<p>After you watch description</p>',
                _unit : '64b6c779368b0620f32984ed',
                _lesson : '64b6c782368b0620f32984f2',
                _exercises : [
                    '660af90c20a265092f53b487'
                ]
            }
        ]
    });

    const enrollment = await Enrollment.create({
        status: 'active',
        learnerId: learner.id,
        teacherId: teacher.id,
        courseIds:[course.id]
    });

    await Assignment.create({
        title: 'Assignment 1',
        content: 'Do your homework',
        status: 'assigned',
        dueDate: new Date('2025-01-01T10:00'),
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

    console.log('DB seeded');

    await db.disconnect();
})();