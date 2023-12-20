import { Form as UIForm } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';

export default function Form({
    children,
    className,
    ...props
}) {
    const classNames = classnames('Form', className);

    return (
        <UIForm
            className={classNames}
            {...props}
        >
            <input type="hidden" name="_csrf" value={window.CSRF_TOKEN} />
            {children}
        </UIForm>
    );
}