import classnames from 'classnames';

import './index.scss';

export default function Icon({ name, size = 'small', className, children = name }) {
    const classNames = classnames('material-icons-round', {
        [`material-icons--${size}`]: size
    }, className);

    return (
        <i className={classNames}>{children}</i>
    );
}