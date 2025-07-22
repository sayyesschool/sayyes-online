import { Schema, Types } from 'mongoose';

const { ObjectId } = Types;

export const EntityRef = new Schema({
    id: ObjectId,
    entity: String
}, {
    _id: false,
    timestamps: false
});