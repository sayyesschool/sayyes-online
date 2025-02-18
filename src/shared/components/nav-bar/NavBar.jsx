import { NavLink } from 'react-router-dom';

import { applySolidInversion } from '@mui/joy/colorInversion';

import { Box, Icon, Tab, TabList, Tabs, Text } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import styles from './NavBar.module.scss';

const IndicatorPlacementByOrientation = {
    horizontal: 'bottom',
    vertical: 'left'
};

export default function NavBar({
    items,
    selectedItemValue,
    orientation,
    invertedColors,
    ...props
}) {
    return (
        <Box
            className={cn(styles.root, styles[orientation])}
            sx={invertedColors ? applySolidInversion('primary') : undefined}
        >
            <Tabs
                orientation={orientation}
                defaultValue={selectedItemValue}
                sx={{ flexDirection: orientation === 'vertical' ? 'column' : 'row' }}
            >
                <TabList disableUnderline>
                    {items.map(item =>
                        <Tab
                            key={item.to}
                            component={NavLink}
                            to={item.to}
                            exact={item.exact}
                            value={item.to}
                            className={styles.item}
                            activeClassName={styles.item_active}
                            orientation={orientation}
                            indicatorPlacement={IndicatorPlacementByOrientation[orientation]}
                        >
                            {item.icon &&
                                <Icon
                                    className={styles.item__icon}
                                    name={item.icon}
                                />
                            }

                            <Text
                                className={styles.item__text}
                                type="body-xs"
                                content={item.text}
                                noWrap
                            />
                        </Tab>
                    )}
                </TabList>
            </Tabs>
        </Box>
    );
}