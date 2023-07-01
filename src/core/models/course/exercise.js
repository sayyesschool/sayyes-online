const { Schema } = require('mongoose');

const Item = require('./item');
const Image = require('./image');

const Exercise = new Schema({
    title: { type: String },
    description: { type: String },
    content: { type: String },
    image: { type: Image },
    notes: { type: String },
    items: [Item],
    unitId: { type: Schema.Types.ObjectId },
    lessonId: { type: Schema.Types.ObjectId }
}, {
    toJSON: {
        transform: (exercise, object) => {
            const progress = exercise.parent()?.progress?.find(item => item.exercise.toString() === exercise.id);

            if (progress) {
                object.progressId = progress.id;
                object.completed = progress.completed;
                object.state = progress.state;
            }

            delete object._unit;
            delete object._lesson;

            return object;
        }
    }
});

Exercise.virtual('uri').get(function() {
    return `${this.parent().uri}/exercises/${this.id}`;
});

Exercise.virtual('courseId').get(function() {
    return this.parent()?.id;
});

Exercise.virtual('imageUrl').get(function() {
    return this.image?.url;
});

module.exports = Exercise;