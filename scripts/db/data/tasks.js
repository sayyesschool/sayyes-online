import datetime from 'shared/libs/datetime';

import { manager } from './users';

export default [
    {
        description: '<p>Провести вводный урок, обсудить цели и ожидания студента.</p>',
        dueDate: datetime().add(10, 'days').toDate(),
        reminderDate: datetime().add(8, 'days').toDate(),
        ownerId: manager._id
    }
];