import classnames from 'classnames';

import './index.scss';

export default function MaterialIcon({ icon, size = 'small', children = icon }) {
    const classNames = classnames('material-icons-round', {
        [`material-icons--${size}`]: size
    });

    return (
        <i className={classNames}>{children}</i>
    );
}