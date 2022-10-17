import { Popup } from '@fluentui/react-northstar';
import classnames from 'classnames';

export default function Popover({ className, ...props }) {
    return (
        <Popup
            className={classnames('ui-popover', className)}
            {...props}
        />
    );
}