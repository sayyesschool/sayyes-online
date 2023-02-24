import classnames from 'classnames';

import { Box, Button, Flex, Icon, Text } from 'shared/ui-components';

import './index.scss';

export default function RoomSidePanel({ open, title, children, onClose, ...props }) {
    const classNames = classnames('room-side-panel', {
        'room-side-panel--open': open
    });

    return (
        <Box className={classNames}>
            <Flex className="room-side-panel__header">
                <Text size="large">{title}</Text>

                <Button
                    icon={<Icon>close</Icon>}
                    iconOnly
                    text
                    onClick={onClose}
                />
            </Flex>

            <Flex className="room-side-panel__content">
                {children}
            </Flex>
        </Box>
    );
}