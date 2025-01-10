import { useContext } from 'react';

import UIContext from 'shared/contexts/ui';
import {
    Button,
    IconButton
} from 'shared/ui-components';

export default function CopyButton({
    content,
    icon,
    copyContent,
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
            onClick={handleCopyButtonClick}
            {...props}
        />
        :
        <Button
            content={content}
            icon={icon}
            onClick={handleCopyButtonClick}
            {...props}
        />
    ;
}