import React from 'react';
import classnames from 'classnames';

import {
    Icon,
    Typography
} from 'mdc-react';

import './index.scss';

export default function EmptyState({ icon, title, subtitle, className, ...props }) {
    const classNames = classnames('empty-state', className);

    return (
        <div className={classNames} {...props}>
            {icon &&
                <Icon className="empty-state__icon">{icon}</Icon>
            }

            <Typography className="empty-state__title" type="headline6">{title}</Typography>

            {subtitle &&
                <Typography className="empty-state__subtitle" type="subtitle1">{subtitle}</Typography>
            }
        </div>
    );
}