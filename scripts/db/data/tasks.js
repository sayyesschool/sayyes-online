import { v4 as uuid } from 'uuid';

import { manager } from './users';

const now = new Date();

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);

    return result;
}

export default [
    {
        uuid: uuid(),
        dueAt: addDays(now, 10),
        remindAt: addDays(now, 8),
        note: '<p>Провести вводный урок, обсудить цели и ожидания студента.</p>',
        performer: manager._id
    }
];