import { Header } from 'shared/ui-components';

import './index.scss';

export default function NotFound({ title = 'Не найдено', message }) {
    return (
        <div className="not-found">
            <Header
                content={title}
                description={message}
            />
        </div>
    );
}