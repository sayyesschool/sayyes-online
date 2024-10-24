import { model } from 'mongoose';

import AdminSchema from './Admin';
import EditorSchema from './Editor';
import LearnerSchema from './Learner';
import ManagerSchema from './Manager';
import TeacherSchema from './Teacher';
import UserSchema from './User';

export {
    AdminSchema,
    EditorSchema,
    LearnerSchema,
    ManagerSchema,
    TeacherSchema,
    UserSchema
};

export const User = model('User', UserSchema);
export const Admin = User.discriminator('Admin', AdminSchema, 'admin');
export const Editor = User.discriminator('Editor', EditorSchema, 'editor');
export const Learner = User.discriminator('Learner', LearnerSchema, 'learner');
export const Manager = User.discriminator('Manager', ManagerSchema, 'manager');
export const Teacher = User.discriminator('Teacher', TeacherSchema, 'teacher');

export default User;