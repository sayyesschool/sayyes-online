import { configureActions, configureStore } from 'shared/store/helpers';
import {
    enrollments,
    learners,
    lessons,
    managers,
    meetings,
    packs,
    payments,
    requests,
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
    packs,
    payments,
    requests,
    rooms,
    teachers,
    user
};

export const useActions = configureActions(modules);
export const useStore = configureStore(modules);