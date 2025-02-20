export const course = {
    _id: '5fb265487ef0653994e53a26',
    title: 'Course',
    description: '<p>Course description</p>',
    units: [
        {
            _id: '64b6c779368b0620f32984ed',
            title: 'Unit 1',
            description: '<p>Unit 1 description</p>',
            _lessons: [
                '64b6c782368b0620f32984f2'
            ]
        }
    ],
    lessons: [
        {
            _id: '64b6c782368b0620f32984f2',
            title: 'Lesson 1',
            description: '<p>Lesson 1 description</p>',
            _unit: '64b6c779368b0620f32984ed',
            _sections: [
                '64b6c8b8368b0620f3298514'
            ]
        }
    ],
    sections: [
        {
            _id: '64b6c8b8368b0620f3298514',
            title: 'After you watch',
            description: '<p>After you watch description</p>',
            _unit: '64b6c779368b0620f32984ed',
            _lesson: '64b6c782368b0620f32984f2',
            _exercises: [
                '660af90c20a265092f53b487'
            ]
        }
    ]
};

export default [course];