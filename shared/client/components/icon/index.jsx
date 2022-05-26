import classnames from 'classnames';

import './index.scss';

export default function Icon({ name, size = 'small', children = name }) {
    const classNames = classnames('material-icons-round', {
        [`material-icons--${size}`]: size
    });

    return (
        <i className={classNames}>{children}</i>
    );
}