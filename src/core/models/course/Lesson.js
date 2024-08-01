import { Schema } from 'mongoose';

import Image from '../image';

export const Lesson = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: Image },
    _unit: { type: Schema.Types.ObjectId, required: true },
    _sections: [Schema.Types.ObjectId]
});

Lesson.virtual('uri').get(function() {
    return `${this.parent().uri}/lessons/${this.id}`;
});

Lesson.virtual('url').get(function() {
    return `${this.parent().url}/lessons/${this.slug}`;
});

Lesson.virtual('courseId').get(function() {
    return this.parent()?.id;
});

Lesson.virtual('unitId')
    .get(function() {
        return this._unit;
    })
    .set(function(value) {
        this._unit = value;
    });

Lesson.virtual('imageUrl').get(function() {
    return this.image?.url || `${process.env.STORAGE_URL}/courses/${this.courseId}/images/${this.id}.jpg`;
});

export default Lesson;