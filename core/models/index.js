module.exports = {
    Converstaion: require('./converstaion'),
    Course: require('./course'),
    Enrollment: require('./enrollment'),
    Lesson: require('./lesson'),
    Payment: require('./payment'),
    Request: require('./request'),
    Quiz: require('./quiz'),
    Client: require('./user').Client,
    Manager: require('./user').Manager,
    Teacher: require('./user').Teacher,
    Student: require('./user').Student,
    User: require('./user').User
};