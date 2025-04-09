import { createId } from 'test/helpers';

export const USER = {
    _id: createId(),
    firstname: 'John',
    lastname: 'Doe',
    email: 'jd@sayyes.school',
    password: 'password'
};
export const USER_ID = USER._id;
export const USER_EMAIL = USER.email;

export const MANAGER = {
    _id: createId(),
    firstname: 'John',
    lastname: 'Doe',
    email: 'manager@sayyes.school',
    role: 'manager'
};

export const LEARNER = {
    _id: createId(),
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'learner@sayyes.school',
    role: 'learner'
};

export const LEARNER_1 = LEARNER;

export const LEARNER_2 = {
    _id: createId(),
    firstname: 'Jake',
    lastname: 'Doe',
    email: 'learner2@sayyes.school',
    role: 'learner'
};