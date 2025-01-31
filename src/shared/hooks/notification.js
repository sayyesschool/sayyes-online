import { useActions } from 'shared/hooks/store';
import { actions as _actions } from 'shared/store/modules/notification';

export function useNotificationActions() {
    return useActions(_actions);
}