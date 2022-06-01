import { Loader } from '@fluentui/react-northstar';
import classnames from 'classnames';

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