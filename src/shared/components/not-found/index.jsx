import { Heading, Text } from 'shared/ui-components';

import './index.scss';

export default function NotFound({ title = 'Не найдено', message }) {
    return (
        <div className="not-found">
            <Heading content={title} />
            <Text content={message} />
        </div>
    );
}