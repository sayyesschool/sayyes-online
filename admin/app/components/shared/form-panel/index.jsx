import { Button } from 'mdc-react';
import classnames from 'classnames';

import SidePanel from 'app/components/shared/side-panel';

import './index.scss';

export default function FormPanel({
    form,
    submitButtonText = 'Сохранить',
    className,
    children,
    ...props
}) {
    return (
        <SidePanel
            className={classnames('form-panel', className)}
            {...props}
        >
            <SidePanel.Content>
                {children}
            </SidePanel.Content>

            <SidePanel.Footer>
                <Button type="submit" form={form} unelevated>{submitButtonText}</Button>
            </SidePanel.Footer>
        </SidePanel>
    );
}