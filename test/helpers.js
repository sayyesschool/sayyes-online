const { Types } = require('mongoose');
const sinon = require('sinon');

sinon.addBehavior('returnsQuery', (fake, value) => {
    fake.returns({
        sort: sinon.stub().returnsThis(),
        populate: sinon.stub().returnsThis(),
        then: fn => fn(value)
    });
});

function at(time = '00:00') {
    return `2022-01-01T${time}:00Z`;
}

function createId() {
    return new Types.ObjectId();
}

module.exports.at = at;
module.exports.createId = createId;