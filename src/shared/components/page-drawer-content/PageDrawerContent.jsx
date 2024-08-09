import PageSection from 'shared/components/page-section';
import { IconButton } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';

export default function PageDrawerContent({ title, className, children, onClose, ...props }) {
    const classNames = classnames(className, 'PageDrawerContent');

    return (
        <PageSection
            className={classNames}
            title={title}
            actions={
                <IconButton
                    icon="close"
                    title="Закрыть"
                    size="sm"
                    onClick={onClose}
                />
            }
            {...props}
        >
            {children}
        </PageSection>
    );
}