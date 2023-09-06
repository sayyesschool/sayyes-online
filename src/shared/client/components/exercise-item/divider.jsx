import { Divider } from 'shared/ui-components';

import './divider.scss';

export default function DividerItem({ content, className }) {
    return (
        <div className={className}>
            <Divider
                content={content}
            />
        </div>
    );
}