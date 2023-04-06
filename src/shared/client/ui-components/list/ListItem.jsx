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
    const classNames = classnames('ui-ListItem', className);

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
                        <Text type="body1">{content.primary}</Text>
                        <Text type="body2">{content.secondary}</Text>
                        <Text type="body3">{content.tertiary}</Text>
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

ListItem.Button = JoyListItemButton;
ListItem.Content = JoyListItemContent;
ListItem.Decorator = JoyListItemDecorator;

export default ListItem;