const { Schema } = require('mongoose');

const Audio = require('./audio');
const Image = require('./image');
const Video = require('./video');

const Item = new Schema({}, {
    strict: false
});

const Exercise = new Schema({
    type: { type: String },
    title: { type: String },
    description: { type: String },
    text: { type: String },
    image: { type: String },
    images: [Image],
    audio: Audio,
    video: Video,
    notes: { type: String },
    items: [Item],
    unit: { type: Schema.Types.ObjectId },
    lesson: { type: Schema.Types.ObjectId }
}, {
    toJSON: {
        transform: (exercise, object) => {
            const progress = exercise.parent()?.progress?.find(item => item.exercise.toString() === exercise.id);

            if (progress) {
                object.isCompleted = progress.completed;
                object.state = progress.state;
            }

            return object;
        }
    }
});

Exercise.virtual('courseId').get(function() {
    return this.parent()?.id;
});

Exercise.virtual('unitId').get(function() {
    return this.unit;
});

Exercise.virtual('lessonId').get(function() {
    return this.lesson;
});

Exercise.virtual('uri').get(function() {
    return `${this.parent().uri}/units/${this.unit}/lessons/${this.lesson}/exercises/${this.id}`;
});

Exercise.virtual('imageUrl').get(function() {
    return this.image?.url;
});

module.exports = Exercise;