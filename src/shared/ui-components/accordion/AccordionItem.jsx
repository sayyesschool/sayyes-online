import { forwardRef } from 'react';
import classnames from 'classnames';

import IconButton from '../icon-button/IconButton';
import Text from '../text/Text';

const AccordionItem = forwardRef(({
    header,
    content,
    open,
    onClick,

    children = content,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-AccordionItem', className);

    return (
        <div
            ref={ref}
            className={classNames}
            {...props}
        >
            <div className="ui-AccordionItem__header">
                <div className="ui-AccordionItem__header-text">{header}</div>

                <IconButton
                    className="ui-AccordionItem__header-icon"
                    icon={open ? 'expand_less' : 'expand_more'}
                    size="sm"
                    variant="plain"
                    color="neutral"
                    sx={{
                        marginLeft: 'auto'
                    }}
                    onClick={onClick}
                />
            </div>

            {open &&
                <div className="ui-AccordionItem__content">
                    {content}
                </div>
            }
        </div>
    );
});

export default AccordionItem;