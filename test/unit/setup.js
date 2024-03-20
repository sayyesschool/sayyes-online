const sinon = require('sinon');

sinon.addBehavior('returnsQuery', (fake, value) => {
    fake.returns({
        sort: sinon.stub().returnsThis(),
        populate: sinon.stub().returnsThis(),
        then: fn => fn(value)
    });
});