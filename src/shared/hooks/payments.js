import { useEffect } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as _actions } from 'shared/store/modules/payments';
import { selectList, selectSingle } from 'shared/store/selectors';

export function usePayments(query) {
    const [payments, actions] = useStore(selectList('payments'), _actions);

    useEffect(() => {
        if (!payments) {
            actions.getPayments(query);
        }
    }, []);

    return [payments, actions];
}

export function usePayment(id) {
    const [payment, actions] = useStore(selectSingle('payments'), _actions);
    const paymentId = payment?.id;

    useEffect(() => {
        console.log({ id, paymentId });
        if (paymentId === id) return;

        actions.getPayment(id);
    }, [paymentId, id, actions]);

    useEffect(() => {
        return () => actions.unsetPayment();
    }, [actions]);

    return [payment, actions];
}