import { Types } from 'mongoose';
import { addBehavior, stub } from 'sinon';

addBehavior('returnsQuery', (fake, value) => {
    fake.returns({
        sort: stub().returnsThis(),
        populate: stub().returnsThis(),
        then: fn => fn(value)
    });
});

export function at(time = '00:00') {
    return `2022-01-01T${time}:00Z`;
}

export function createId() {
    return new Types.ObjectId();
}