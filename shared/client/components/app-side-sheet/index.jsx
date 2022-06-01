import { Box } from '@fluentui/react-northstar';
import classnames from 'classnames';

import './index.scss';

export default function AppSideSheet({ className, children, ...props }) {
    const classNames = classnames('app-side-sheet', className);

    return (
        <Box
            className={classNames}
            {...props}
        >
            {children}
        </Box>
    );
}