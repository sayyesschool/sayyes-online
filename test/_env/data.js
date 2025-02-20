import { ENROLLMENT, ENROLLMENT_PACKS, USER as USER_DATA } from 'test/_data';

import { models } from './context';
import { withDocument } from './helpers';

const { Enrollment, Data, User } = models;

export const USER = new User(USER_DATA);

export function withEnrollment(data = ENROLLMENT, options) {
    return withDocument(Enrollment, data, options);
}

export function withEnrollmentPacks(options) {
    return withDocument(Data, {
        key: 'enrollment.packs',
        value: ENROLLMENT_PACKS
    }, options);
}