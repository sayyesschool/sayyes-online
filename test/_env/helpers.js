import { MEETING, MEMBERSHIP, PACKS, USER } from 'test/_data';
import { models } from 'test/_env';

const { Data, Meeting, Membership, User } = models;

export function withMeeting(data = MEETING, options) {
    return withModel(Meeting, data, options);
}

export function withMembership(data = MEMBERSHIP, options) {
    return withModel(Membership, data, options);
}

export function withMembershipPacks(options) {
    return withModel(Data, { key: 'club.packs', value: PACKS }, options);
}

export function withUser(data = USER, options) {
    return withModel(User, data, options);
}

export function withModel(Model, data, options = {}) {
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
        },
        has(_, prop) {
            return prop in state.doc;
        },
        apply(_, thisArg, args) {
            return state.doc?.apply(thisArg, args);
        }
    });
}