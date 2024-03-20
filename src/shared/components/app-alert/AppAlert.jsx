import { Alert } from 'shared/ui-components';

export default function AppAlert({ ...props }) {
    return (
        <Alert
            className="AppAlert"
            {...props}
        />
    );
}