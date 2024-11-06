import { NavLink } from 'react-router-dom';

import { applySolidInversion } from '@mui/joy/colorInversion';

import { Box, Icon, Tab, TabList, Tabs } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import styles from './NavBar.module.scss';

const IndicatorPlacementByOrientation = {
    horizontal: 'bottom',
    vertical: 'right'
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
            className={cn(styles.root, styles.orientation)}
            sx={invertedColors ? applySolidInversion('primary') : undefined}
        >
            <Tabs
                orientation={orientation}
                defaultValue={selectedItemValue}
            >
                <TabList disableUnderline>
                    {items.map(item =>
                        <Tab
                            key={item.to}
                            component={NavLink}
                            to={item.to}
                            exact={item.exact}
                            value={item.to}
                            className="NavBarItem"
                            activeClassName="NavBarItem--active"
                            orientation={orientation}
                            indicatorPlacement={IndicatorPlacementByOrientation[orientation]}
                        >
                            {item.icon &&
                                <Icon
                                    className="NavBarItem__icon"
                                    name={item.icon}
                                />
                            }

                            <span className={styles.text}>{item.text}</span>
                        </Tab>
                    )}
                </TabList>
            </Tabs>
        </Box>
    );
}