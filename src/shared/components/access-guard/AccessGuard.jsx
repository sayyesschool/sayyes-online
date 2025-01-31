export default function AccessGuard({ user, permissions, children }) {
    if (!user) return null;

    if (
        user?.permissions.includes('all') ||
        permissions.some(permission => user?.permissions.includes(permission))
    ) {
        return children;
    }

    return null;
}