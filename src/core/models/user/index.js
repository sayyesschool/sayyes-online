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

export default () => {
    const User = model('User', UserSchema);
    const Admin = User.discriminator('Admin', AdminSchema, 'admin');
    const Editor = User.discriminator('Editor', EditorSchema, 'editor');
    const Learner = User.discriminator('Learner', LearnerSchema, 'learner');
    const Manager = User.discriminator('Manager', ManagerSchema, 'manager');
    const Teacher = User.discriminator('Teacher', TeacherSchema, 'teacher');

    return {
        User,
        Admin,
        Editor,
        Learner,
        Manager,
        Teacher
    };
};