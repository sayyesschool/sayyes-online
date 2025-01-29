import { useContext } from 'react';

import UIContext from 'shared/contexts/ui';
import {
    Button,
    IconButton
} from 'shared/ui-components';

export default function CopyButton({
    content,
    icon = 'content_copy',
    copyContent,
    title = 'Копировать',
    tooltipContent = 'Скопировано',
    ...props
}) {
    const UI = useContext(UIContext);

    function handleCopyButtonClick() {
        navigator.clipboard.writeText(copyContent);
        UI.showNotification({ text: tooltipContent });
    }

    return icon && !content ?
        <IconButton
            icon={icon}
            title={title}
            variant="plain"
            onClick={handleCopyButtonClick}
            {...props}
        />
        :
        <Button
            content={content}
            icon={icon}
            title={title}
            variant="plain"
            onClick={handleCopyButtonClick}
            {...props}
        />
    ;
}