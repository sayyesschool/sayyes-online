import classnames from 'classnames';

import './index.scss';

export default function TextContent({ text, className, ...props }) {
    const classNames = classnames('text-content', className);

    return (
        <section
            className={classNames}
            dangerouslySetInnerHTML={{ __html: text }}
            {...props}
        />
    );
}