import { useStore } from 'shared/hooks/store';
import { actions as accountActions } from 'shared/store/modules/account';

function useAccount() {
    const [account, actions] = useStore(state => state.user, accountActions);

    return [account, actions];
}

export { useAccount as default, useAccount };