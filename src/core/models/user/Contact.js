import { Schema } from 'mongoose';

import Person from './Person';

export const Contact = new Schema([Person, {
    relation: { type: String },
    occupation: { type: String },
    note: { type: String, trim: true }
}]);

export default Contact;