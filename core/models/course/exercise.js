const { Schema } = require('mongoose');

const Item = new Schema({}, {
    strict: false
});

const Exercise = new Schema({
    type: { type: String },
    title: { type: String },
    description: { type: String },
    text: { type: String },
    image: { type: String },
    audio: { type: String },
    video: { type: String },
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

Exercise.virtual('uri').get(function() {
    return `${this.parent().uri}/units/${this.unit}/lessons/${this.lesson}/exercises/${this.id}`;
});

Exercise.virtual('imageUrl').get(function() {
    return `${process.env.STATIC_URL}${this.ownerDocument()?.uri}/images/${this.image}`;
});

module.exports = Exercise;