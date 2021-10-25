import { CircularProgress } from 'mdc-react';

import './index.scss';

export default function LoadingIndicator() {
    return (
        <div className="loading-indicator">
            <CircularProgress size="large" indeterminate />
        </div>
    );
}