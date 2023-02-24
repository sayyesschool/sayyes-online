import classnames from 'classnames';

import { Loader } from 'shared/ui-components';

import './index.scss';

export default function LoadingIndicator({ fullscreen, className }) {
    return (
        <div className={classnames('loading-indicator', {
            'loading-indicator--fullscreen': fullscreen
        }, className)}>
            <Loader label="Загрузка" />
        </div>
    );
}