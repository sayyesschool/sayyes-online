import { Children, isValidElement, cloneElement } from 'react';
import classnames from 'classnames';

import './index.scss';

export default function Breadcrumbs({ items, className }) {
    const classNames = classnames('breadcrumbs', className);

    return (
        <div className={classNames}>
            {Children.map(items, item =>
                isValidElement(item) ?
                    cloneElement(item, { className: 'breadcrumbs__item' }) :
                    <span className="breadcrumbs__item">{item}</span>
            )}
        </div>
    );
}