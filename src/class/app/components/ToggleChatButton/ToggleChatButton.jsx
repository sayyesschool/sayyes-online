import { Badge, IconButton } from 'shared/ui-components';

export default function ToggleChatButton({
    active,
    badgeCount,
    ...props
}) {
    return (
        <Badge content={badgeCount || 0} size="sm">
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