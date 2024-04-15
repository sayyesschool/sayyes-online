import { model } from 'mongoose';

import Assignment from './assignment';
import Comment from './comment';
import Course from './course';
import Enrollment from './enrollment';
import Exercise from './exercise';
import Lesson from './lesson';
import Lexeme from './lexeme';
import Lexicon from './lexicon';
import Material from './material';
import Meeting from './meeting';
import Pack from './pack';
import Payment from './payment';
import Progress from './progress';
import Request from './request';
import Room from './room';
import Task from './task';
import Transaction from './transaction';
import UserSchema, {
    Admin as AdminSchema,
    Editor as EditorSchema,
    Learner as LearnerSchema,
    Manager as ManagerSchema,
    Teacher as TeacherSchema
} from './user';
import Vocabulary from './vocabulary';

const User = model('User', UserSchema);
const Admin = User.discriminator('Admin', AdminSchema, 'admin');
const Editor = User.discriminator('Editor', EditorSchema, 'editor');
const Learner = User.discriminator('Learner', LearnerSchema, 'learner');
const Manager = User.discriminator('Manager', ManagerSchema, 'manager');
const Teacher = User.discriminator('Teacher', TeacherSchema, 'teacher');

export default () => ({
    Assignment: model('Assignment', Assignment),
    Comment: model('Comment', Comment),
    Course: model('Course', Course),
    Enrollment: model('Enrollment', Enrollment),
    Exercise: model('Exercise', Exercise),
    Lexicon: model('Lexicon', Lexicon, 'lexicon'),
    Lexeme: model('Lexeme', Lexeme),
    Lesson: model('Lesson', Lesson),
    Material: model('Material', Material),
    Meeting: model('Meeting', Meeting),
    Pack: model('Pack', Pack),
    Payment: model('Payment', Payment),
    Progress: model('Progress', Progress, 'progress'),
    Request: model('Request', Request),
    Room: model('Room', Room),
    Task: model('Task', Task),
    Transaction: model('Transaction', Transaction),
    Vocabulary: model('Vocabulary', Vocabulary),
    User,
    Admin,
    Editor,
    Learner,
    Manager,
    Teacher
});