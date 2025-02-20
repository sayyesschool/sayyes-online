import { model } from 'mongoose';

import Assignment from './assignment';
import Comment from './comment';
import Course from './course';
import Data from './data';
import Enrollment from './enrollment';
import Exercise from './exercise';
import Lesson from './lesson';
import Lexeme from './lexeme';
import Material from './material';
import Meeting from './meeting';
import Membership from './membership';
import Pack from './pack';
import Payment from './payment';
import Progress from './progress';
import Record from './record';
import Registration from './registration';
import Request from './request';
import Room from './room';
import Task from './task';
import Transaction from './transaction';
import User from './user';
import Vocabulary from './vocabulary';

export default () => ({
    Assignment: model('Assignment', Assignment),
    Comment: model('Comment', Comment),
    Course: model('Course', Course),
    Data: model('Data', Data, 'data'),
    Enrollment: model('Enrollment', Enrollment),
    Exercise: model('Exercise', Exercise),
    Lexeme: model('Lexeme', Lexeme),
    Lesson: model('Lesson', Lesson),
    Material: model('Material', Material),
    Meeting: model('Meeting', Meeting),
    Membership: model('Membership', Membership),
    Pack: model('Pack', Pack),
    Payment: model('Payment', Payment),
    Progress: model('Progress', Progress, 'progress'),
    ...Record(),
    Registration: model('Registration', Registration),
    Request: model('Request', Request),
    Room: model('Room', Room),
    Task: model('Task', Task),
    Transaction: model('Transaction', Transaction),
    Vocabulary: model('Vocabulary', Vocabulary),
    ...User()
});