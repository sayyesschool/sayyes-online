
import { useUser } from 'shared/hooks/user';

function useUserRole() {
    const [user] = useUser();

    const role = user?.role;

    return {
        role,
        isAdmin: role === 'admin',
        isEditor: role === 'editor',
        isLearner: role === 'learner',
        isManager: role === 'manager',
        isTeacher: role === 'teacher'
    };
}

export { useUserRole as default, useUserRole };