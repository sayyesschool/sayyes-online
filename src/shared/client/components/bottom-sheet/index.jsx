import classnames from 'classnames';

import Button from 'shared/ui-components/button';
import Icon from 'shared/ui-components/icon';

import './index.scss';

export default function BottomSheet({ open = false, children, onClose }) {
    return (
        <div className={classnames('bottom-sheet', {
            'bottom-sheet--open': open
        })}>
            <div className="bottom-sheet__content">
                {children}
            </div>

            <div className="bottom-sheet__actions">
                {onClose &&
                    <Button
                        icon={<Icon>close</Icon>}
                        onClick={onClose}
                    />
                }
            </div>
        </div>
    );
}