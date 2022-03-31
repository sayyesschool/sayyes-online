import { Loader } from '@fluentui/react-northstar';
import classnames from 'classnames';

import './index.scss';

export default function LoadingIndicator({ className }) {
    return (
        <div className={classnames('loading-indicator', className)}>
            <Loader label="Загрузка" />
        </div>
    );
}