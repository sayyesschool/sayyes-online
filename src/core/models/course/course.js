const { Schema } = require('mongoose');

const Image = require('../image');
const Lesson = require('./lesson');
const Section = require('./section');
const Unit = require('./unit');

const Course = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    level: { type: String },
    duration: { type: String },
    image: { type: Image },
    units: [Unit],
    lessons: [Lesson],
    sections: [Section]
});

Course.virtual('uri').get(function() {
    return `/courses/${this.id}`;
});

Course.virtual('url').get(function() {
    return `/courses/${this.id}`;
});

Course.virtual('imageUrl').get(function() {
    return this.image?.url || `${process.env.STORAGE_URL}/courses/${this.id}/images/${this.id}.png`;
});

Course.virtual('exercises', {
    ref: 'Exercise',
    localField: '_id',
    foreignField: 'courseId'
});

Course.virtual('progress', {
    ref: 'Progress',
    localField: '_id',
    foreignField: 'course'
});

Course.static('createUnit', async function(courseId, data) {
    const course = await this.findByIdAndUpdate(courseId, {
        $push: { units: data }
    }, {
        new: true,
        projection: {
            id: true,
            slug: true,
            units: { $slice: -1 }
        }
    });

    return course.units[0];
});

Course.static('updateUnit', async function(courseId, unitId, data) {
    const course = await this.findByIdAndUpdate(courseId, {
        $set: getUpdateData('units', data)
    }, {
        new: true,
        arrayFilters: [{ 'u._id': unitId }],
        projection: {
            id: true,
            slug: true,
            units: { $elemMatch: { _id: unitId } }
        }
    });

    return course.units[0];
});

Course.static('deleteUnit', async function(courseId, unitId) {
    const course = await this.findByIdAndUpdate(courseId, {
        $pull: {
            units: { _id: unitId },
            lessons: { unitId },
            sections: { unitId },
            exercises: { unitId }
        }
    }, {
        new: false,
        projection: {
            id: true,
            slug: true,
            units: { $elemMatch: { _id: unitId } }
        }
    });

    return course.units[0];
});

Course.static('createLesson', async function(courseId, data) {
    const CourseModel = this.model('Course');
    const lesson = new CourseModel().lessons.create(data);
    const error = lesson.validateSync();

    if (error) throw error;

    const course = await this.findOneAndUpdate({
        _id: courseId,
        'units._id': lesson.unitId
    }, {
        $push: {
            lessons: lesson,
            'units.$[u]._lessons': lesson.id
        }
    }, {
        new: true,
        arrayFilters: [{ 'u._id': lesson.unitId }],
        projection: {
            id: true,
            slug: true,
            lessons: { $slice: -1 }
        }
    });

    if (!course) throw {
        message: 'Курс или юнит не найден'
    };

    return course.lessons[0];
});

Course.static('updateLesson', async function(courseId, lessonId, data) {
    const course = await this.findByIdAndUpdate(courseId, {
        $set: getUpdateData('lessons', data)
    }, {
        new: true,
        arrayFilters: [{ 'l._id': lessonId }],
        projection: {
            id: true,
            slug: true,
            lessons: { $elemMatch: { _id: lessonId } }
        }
    });

    return course.lessons[0];
});

Course.static('deleteLesson', async function(courseId, lessonId) {
    const course = await this.findByIdAndUpdate(courseId, {
        $pull: {
            lessons: { _id: lessonId },
            'units.$[u]._lessons': lessonId,
            sections: { lessonId: lessonId }
        }
    }, {
        arrayFilters: [{ 'u._lessons': lessonId }],
        projection: {
            lessons: { $elemMatch: { _id: lessonId } },
            units: { $elemMatch: { _lessons: lessonId } }
        }
    });

    return course.lessons[0];
});

Course.static('createSection', async function(courseId, data) {
    const CourseModel = this.model('Course');
    const section = new CourseModel().sections.create(data);
    const error = section.validateSync();

    if (error) throw error;

    const course = await this.findOneAndUpdate({
        _id: courseId,
        'units._id': section.unitId,
        'lessons._id': section.lessonId
    }, {
        $push: {
            sections: section,
            'lessons.$[l]._sections': section.id
        }
    }, {
        new: true,
        arrayFilters: [{ 'l._id': section.lessonId }],
        projection: {
            id: true,
            slug: true,
            sections: { $slice: -1 }
        }
    });

    if (!course) throw {
        message: 'Курс или урок не найден'
    };

    return course.sections[0];
});

Course.static('updateSection', async function(courseId, sectionId, data) {
    const course = await this.findByIdAndUpdate(courseId, {
        $set: getUpdateData('sections', data)
    }, {
        new: true,
        arrayFilters: [{ 's._id': sectionId }],
        projection: {
            id: true,
            slug: true,
            sections: { $elemMatch: { _id: sectionId } }
        }
    });

    if (!course) throw {
        message: 'Курс или секция не найдена'
    };

    return course.sections[0];
});

Course.static('deleteSection', async function(courseId, sectionId) {
    const course = await this.findByIdAndUpdate(courseId, {
        $pull: {
            sections: { _id: sectionId },
            'lessons.$[l]._sections': sectionId
        }
    }, {
        arrayFilters: [{ 'l._sections': sectionId }],
        projection: {
            sections: { $elemMatch: { _id: sectionId } },
            lessons: { $elemMatch: { _sections: sectionId } }
        }
    });

    if (!course) throw {
        message: 'Курс или секция не найдена'
    };

    return course.sections[0];
});

Course.static('addExercise', async function(courseId, sectionId, exerciseId) {
    return this.updateOne({ _id: courseId }, {
        $push: {
            'sections.$[s]._exercises': exerciseId
        }
    }, {
        arrayFilters: [{ 's._id': sectionId }]
    });
});

Course.static('removeExercise', async function(courseId, sectionId, exerciseId) {
    return this.updateOne({ _id: courseId }, {
        $pull: {
            'sections.$[s]._exercises': exerciseId
        }
    }, {
        arrayFilters: [{ 's._id': sectionId }],
    });
});

module.exports = Course;

function getUpdateData(field, data) {
    return Array.from(Object.entries(data))
        .reduce((data, [key, value]) => {
            data[`${field}.$[${field[0]}].${key}`] = value;
            return data;
        }, {});
}