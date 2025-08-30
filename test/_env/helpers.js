import { MEETING, MEMBERSHIP, PACKS, USER } from 'test/_data';
import { clients, models } from 'test/_env';

const { Data, Meeting, Membership, Payment, Room, User } = models;

export function withMeeting(data = MEETING, options) {
    return withDocument(Meeting, data, options);
}

export function withMembership(data = MEMBERSHIP, options) {
    return withDocument(Membership, data, options);
}

export function withMembershipPacks(options) {
    return withDocument(Data, {
        key: 'club.packs',
        value: PACKS
    }, options);
}

export function withPayment(data, options) {
    return withDocument(Payment, data, options);
}

export function withRoom(data, options) {
    return withDocument(Room, data, options);
}

export function withUser(data = USER, options) {
    return withDocument(User, data, options);
}

export function withDocument(Model, data, options = {}) {
    const state = {};

    async function createModel() {
        state.doc = await Model.create(data);
    }

    async function deleteModel() {
        await Model.deleteOne({ _id: state.doc.id });
        state.doc = null;
    }

    if (!options.eachOnly) {
        before(createModel);
        after(deleteModel);
    }

    if (options.each) {
        beforeEach(createModel);
        afterEach(deleteModel);
    }

    return new Proxy(state, {
        get(_, prop) {
            return state.doc?.[prop];
        },
        set(_, prop, value) {
            state.doc[prop] = value;

            return true;
        },
        has(_, prop) {
            return prop in state.doc;
        },
        apply(_, thisArg, args) {
            return state.doc?.apply(thisArg, args);
        }
    });
}

export function withModel(Model, options = {
    cleanupBefore: false,
    cleanupBeforeEach: false,
    cleanupAfterEach: false,
    cleanupAfter: true
}) {
    async function cleanup() {
        await Model.deleteMany({});
    }

    if (options.cleanupBefore) {
        before(cleanup);
    }

    if (options.cleanupBeforeEach) {
        beforeEach(cleanup);
    }

    if (options.cleanupAfterEach) {
        afterEach(cleanup);
    }

    if (options.cleanupAfter) {
        after(cleanup);
    }
}

export function withMailClient() {
    afterEach(() => {
        clients.mail.send.reset();
    });
}