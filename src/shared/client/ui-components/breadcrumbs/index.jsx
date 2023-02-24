import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '@fluentui/react-northstar';

import Icon from 'shared/ui-components/icon';

import './index.scss';

export default function Breadcrumbs({ items, ...props }) {
    return (
        <Breadcrumb aria-label="breadcrumb" {...props}>
            {items.map((item, index, items) =>
                <Fragment key={index}>
                    <Breadcrumb.Item>
                        <Breadcrumb.Link as={item.url && Link} to={item.url} title={item.title}>
                            {item.text}
                        </Breadcrumb.Link>
                    </Breadcrumb.Item>

                    {(index < (items.length - 1)) &&
                        <Breadcrumb.Divider>
                            <Icon>chevron_right</Icon>
                        </Breadcrumb.Divider>
                    }
                </Fragment>
            )}
        </Breadcrumb>
    );
}