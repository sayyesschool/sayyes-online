const GET_PAYMENTS = 'GET_PAYMENTS';

export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_PAYMENTS:
            return {
                ...state,
                list: action.data.payments
            };

        default:
            return state;
    }
}

export function getPayments() {
    return {
        type: GET_PAYMENTS,
        request: {
            method: 'get',
            url: '/payments'
        }
    };
}

export const types = {
    GET_PAYMENTS
};

export const actions = {
    getPayments
};