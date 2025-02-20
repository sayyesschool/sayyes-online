import { createId } from 'test/helpers';

import { USER_ID } from './user';

export const ENROLLMENT = {
    _id: createId(),
    schedule: [
        {
            day : 2,
            from : '21:00',
            to : '21:50'
        },
        {
            day : 5,
            from : '12:00',
            to : '12:50'
        }
    ],
    learnerId: USER_ID
};

export const ENROLLMENT_ID = ENROLLMENT._id.toString();

export const ENROLLMENT_PACK_5_ID = createId().toString();
export const ENROLLMENT_PACK_10_ID = createId().toString();
export const ENROLLMENT_PACK_20_ID = createId().toString();
export const ENROLLMENT_PACK_40_ID = createId().toString();
export const ENROLLMENT_PACK_60_ID = createId().toString();

export const ENROLLMENT_PACK_5 = {
    id: ENROLLMENT_PACK_5_ID,
    age: 'adults',
    domain: 'general',
    teacher: 'russian',
    numberOfLessons: 5,
    lessonPrice: 1300,
    lessonDuration: 50,
    price: 6500
};

export const ENROLLMENT_PACK_10 = {
    id: ENROLLMENT_PACK_10_ID,
    age: 'adults',
    domain: 'general',
    teacher: 'russian',
    numberOfLessons: 10,
    lessonPrice: 1230,
    lessonDuration: 50,
    price: 12300
};

export const ENROLLMENT_PACK_20 = {
    id: ENROLLMENT_PACK_20_ID,
    age: 'adults',
    domain: 'general',
    teacher: 'russian',
    numberOfLessons: 20,
    lessonPrice: 1155,
    lessonDuration: 50,
    price: 23100
};

export const ENROLLMENT_PACK_40 = {
    id: ENROLLMENT_PACK_40_ID,
    age: 'adults',
    domain: 'general',
    teacher: 'russian',
    numberOfLessons: 40,
    lessonPrice: 1030,
    lessonDuration: 50,
    price: 41200
};

export const ENROLLMENT_PACK_60 = {
    id: ENROLLMENT_PACK_60_ID,
    age: 'adults',
    domain: 'general',
    teacher: 'russian',
    numberOfLessons: 60,
    lessonPrice: 950,
    lessonDuration: 50,
    price: 57000
};

export const ENROLLMENT_PACKS = [
    ENROLLMENT_PACK_5,
    ENROLLMENT_PACK_10,
    ENROLLMENT_PACK_20,
    ENROLLMENT_PACK_40,
    ENROLLMENT_PACK_60
];