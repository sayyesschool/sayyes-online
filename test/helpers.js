import { Types } from 'mongoose';
import sinon from 'sinon';

sinon.addBehavior('returnsQuery', (fake, value) => {
    fake.returns({
        sort: sinon.stub().returnsThis(),
        populate: sinon.stub().returnsThis(),
        then: fn => fn(value)
    });
});

export function at(time = '00:00') {
    return `2022-01-01T${time}:00Z`;
}

export function createId() {
    return new Types.ObjectId();
}