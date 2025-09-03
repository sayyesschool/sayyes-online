import { Schema } from 'mongoose';

import Item from './Item';

export const Exercise = new Schema({
    courseId: { type: Schema.Types.ObjectId, required: true },
    sectionId: { type: Schema.Types.ObjectId, required: true },
    lessonId: { type: Schema.Types.ObjectId, required: true },
    unitId: { type: Schema.Types.ObjectId, required: true },
    description: { type: String, default: '' },
    notes: { type: String },
    items: [Item]
});

Exercise.virtual('progress', {
    ref: 'Progress',
    localField: '_id',
    foreignField: 'exerciseId',
    justOne: true
});

Exercise.virtual('url').get(function() {
    return `/courses/${this.courseId}/exercises/${this.id}`;
});

Exercise.virtual('uri').get(function() {
    return `/exercises/${this.id}`;
});

Exercise.static('addItem', async function(exerciseId, { data, position } = {}) {
    if (!data) throw {
        code: 400,
        message: 'Не передан элемент'
    };

    const ExerciseModel = this.model('Exercise');
    const item = new ExerciseModel().items.create(data);
    const error = item.validateSync();

    if (error) throw error;

    const exercise = await this.findByIdAndUpdate(exerciseId, {
        $push: {
            items: position !== undefined ? {
                $each: [item],
                $position: position
            } : item
        }
    }, {
        new: true
    });

    const updatedItem = exercise.items.at(position !== undefined ? position : -1).toObject();

    return updatedItem;
});

Exercise.static('updateItem', async function(exerciseId, itemId, data) {
    const setData = Array.from(Object.entries(data))
        .reduce((data, [key, value]) => {
            data[`items.$[i].${key}`] = value;
            return data;
        }, {});

    const { items: [item] } = await this.findByIdAndUpdate(exerciseId, {
        $set: setData
    }, {
        new: true,
        arrayFilters: [{ 'i._id': itemId }],
        projection: {
            id: true,
            items: { $elemMatch: { _id: itemId } }
        }
    });

    return item;
});

Exercise.static('removeItem', async function(exerciseId, itemId) {
    const { items: [item] } = await this.findByIdAndUpdate(exerciseId, {
        $pull: {
            items: { _id: itemId }
        }
    }, {
        new: false,
        projection: {
            id: true,
            items: { $elemMatch: { _id: itemId } }
        }
    });

    return item;
});

export default Exercise;