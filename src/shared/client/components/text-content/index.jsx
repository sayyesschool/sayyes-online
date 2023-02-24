import classnames from 'classnames';

import './index.scss';

export default function TextContent({ text, className, children = text, ...props }) {
    const classNames = classnames('text-content', className);

    return (
        <div
            className={classNames}
            dangerouslySetInnerHTML={{ __html: children }}
            {...props}
        />
    );
}