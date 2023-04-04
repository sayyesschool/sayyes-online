import { Badge, IconButton } from 'shared/ui-components';

export default function ToggleChatButton({
    active,
    numberOfUnreadMessages,
    ...props
}) {
    return (
        <Badge content={numberOfUnreadMessages || undefined} size="sm">
            <IconButton
                title="Чат"
                icon="forum"
                variant={active ? 'soft' : 'plain'}
                color={active ? 'primary' : 'neutral'}
                size="sm"
                {...props}
            />
        </Badge>
    );
}