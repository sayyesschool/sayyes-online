import { createContext, useMemo, useState } from 'react';

import { DuePeriod, Status } from 'core/models/task/constants';

import { useUser } from 'shared/hooks/user';
import { stripEmptyValues } from 'shared/utils/object';

const context = createContext({});

const { Provider } = context;

const defaultFilters = {
    topic: '',
    assignee: '',
    priority: '',
    dueDate: DuePeriod.Today,
    completed: String(Status.Open)
};

const getDefaultFilters = userId => ({
    ...defaultFilters,
    assignee: userId
});

export function TasksContext({ children }) {
    const [user] = useUser();

    const [filters, setFilters] = useState(getDefaultFilters(user.id));
    const [isFormOpen, setFormOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const value = useMemo(() => ({
        filters,
        isFormOpen,
        isLoading
    }), [filters, isFormOpen, isLoading]);

    return (
        <Provider value={value}>{children}</Provider>
    );
}

export { context as default };