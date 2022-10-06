import { Segment } from '@fluentui/react-northstar';
import classnames from 'classnames';

export default function Surface({ className, children, ...props }) {
    return (
        <Segment className={classnames('ui-surface', className)} {...props}>
            {children}
        </Segment>
    );
}