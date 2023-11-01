import { useEffect, useState } from 'react';

export default function useMediaDevicePermission(name) {
    const [permission, setPermission] = useState();

    useEffect(() => {
        if (!navigator.permissions) return false;

        try {
            navigator.permissions.query({
                name
            }).then(result => {
                setPermission(result);
            });
        } catch {
            return false;
        }
    }, [name]);

    return permission;
}