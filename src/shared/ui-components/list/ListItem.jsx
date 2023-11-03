import { isValidElement, forwardRef } from 'react';
import classnames from 'classnames';

import JoyListItem from '@mui/joy/ListItem';
import JoyListItemButton from '@mui/joy/ListItemButton';
import JoyListItemContent from '@mui/joy/ListItemContent';
import JoyListItemDecorator from '@mui/joy/ListItemDecorator';

import Text from '../text/Text';

const ListItem = forwardRef(({
    start,
    end,
    content,
    decorator,
    interactive,
    selected,
    to,

    as,
    children,
    className,
    ...props
}, ref) => {
    const classNames = classnames(className, 'ui-ListItem');

    const listItemContent = (<>
        {decorator &&
            <JoyListItemDecorator>
                {decorator}
            </JoyListItemDecorator>
        }

        {content &&
            <JoyListItemContent>
                {isValidElement(content) ? content : (
                    typeof content === 'object' ? (<>
                        <Text type="body-md">{content.primary}</Text>
                        <Text type="body-sm">{content.secondary}</Text>
                        <Text type="body-xs">{content.tertiary}</Text>
                    </>) : content
                )}
            </JoyListItemContent>
        }

        {children}
    </>);

    return (
        <JoyListItem
            ref={ref}
            className={classNames}
            startAction={start}
            endAction={end}
            {...props}
        >
            {(interactive || to) ?
                <JoyListItemButton
                    component={as}
                    to={to}
                    selected={selected}
                >
                    {listItemContent}
                </JoyListItemButton>
                :
                listItemContent
            }
        </JoyListItem>
    );
});

ListItem.displayName = 'ListItem';

ListItem.Button = JoyListItemButton;
ListItem.Content = JoyListItemContent;
ListItem.Decorator = JoyListItemDecorator;

export default ListItem;