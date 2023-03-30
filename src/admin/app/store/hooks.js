import {
    clients,
    enrollments,
    lessons,
    managers,
    meetings,
    packs,
    payments,
    requests,
    rooms,
    teachers,
    user,
} from 'shared/store/modules';
import { configureActions, configureStore } from 'shared/store/helpers';

const modules = {
    clients,
    enrollments,
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