import { configureActions, configureStore } from 'shared/store/helpers';
import {
    enrollments,
    learners,
    lessons,
    managers,
    meetings,
    memberships,
    packs,
    payments,
    rooms,
    teachers,
    user
} from 'shared/store/modules';

const modules = {
    enrollments,
    learners,
    lessons,
    managers,
    meetings,
    memberships,
    packs,
    payments,
    rooms,
    teachers,
    user
};

export const useActions = configureActions(modules);
export const useStore = configureStore(modules);