import classnames from 'classnames';
import {
    IconButton
} from 'mdc-react';

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
                    <IconButton
                        icon="close"
                        onClick={onClose}
                    />
                }
            </div>
        </div>
    );
}