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