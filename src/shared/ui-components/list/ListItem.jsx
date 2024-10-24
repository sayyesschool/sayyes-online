import { forwardRef, isValidElement } from 'react';

import JoyListItem from '@mui/joy/ListItem';
import JoyListItemButton from '@mui/joy/ListItemButton';
import JoyListItemContent from '@mui/joy/ListItemContent';
import JoyListItemDecorator from '@mui/joy/ListItemDecorator';
import classnames from 'classnames';

import Icon from '../icon/Icon';
import Text from '../text/Text';

const ListItem = forwardRef(({
    start,
    end,
    content,
    icon,
    decorator = icon && <Icon name={icon} />,
    interactive,
    selected,
    to,
    color,
    variant,

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
                        <Text type="body-md">{content.primary}</Text>

                        {content.secondary &&
                            <Text type="body-sm">{content.secondary}</Text>
                        }

                        {content.tertiary &&
                            <Text type="body-xs">{content.tertiary}</Text>
                        }
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
            color={color}
            variant={variant}
            {...props}
        >
            {(interactive || to) ?
                <JoyListItemButton
                    component={as}
                    to={to}
                    selected={selected}
                    color={color}
                    variant={variant}
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