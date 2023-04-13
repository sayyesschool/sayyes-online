import { courses, materials, notification, user } from 'shared/store/modules';
import { configureActions, configureStore } from 'shared/store/helpers';

const modules = {
    courses,
    materials,
    notification,
    user
};

export const useActions = configureActions(modules);
export const useStore = configureStore(modules);