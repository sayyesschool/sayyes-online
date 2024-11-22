import expect from 'expect';
import { Types } from 'mongoose';
import sinon from 'sinon';

sinon.addBehavior('returnsQuery', (fake, value) => {
    fake.returns({
        sort: sinon.stub().returnsThis(),
        populate: sinon.stub().returnsThis(),
        then: fn => fn(value)
    });
});

export { mock } from 'node:test';

export function at(time = '00:00') {
    return `2022-01-01T${time}:00Z`;
}

export function createId() {
    return new Types.ObjectId();
}

export function spy(...args) {
    return expect.createSpy(...args);
}

export function spyOn(obj, method) {
    return expect.spyOn(obj, method);
}

export function toJSON(arg) {
    return JSON.parse(JSON.stringify(arg?.toJSON ? arg.toJSON() : arg));
}