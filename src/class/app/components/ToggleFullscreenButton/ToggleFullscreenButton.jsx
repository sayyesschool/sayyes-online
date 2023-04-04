import { IconButton } from 'shared/ui-components';

export default function ToggleFullscreenButton({
    active,
    ...props
}) {
    return (
        <IconButton
            icon={active ? 'fullscreen_exit' : 'fullscreen'}
            title={active ? 'Полный экран' : 'Отключить полный экран'}
            color={active ? 'primary' : 'neutral'}
            variant={active ? 'soft' : 'plain'}
            size="sm"
            {...props}
        />
    );
}