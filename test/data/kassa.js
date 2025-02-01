export const PAYMENT_WAITING_FOR_CAPTURE = {
    'id': '22e12f66-000f-5000-8000-18db351245c7',
    'description': 'Заказ №72',
    'amount': {
        'value': '100.00',
        'currency': 'RUB'
    },
    'status': 'waiting_for_capture',
    'isWaitingForCapture': true,
    'paid': true,
    'refundable': false,
    'test': false,
    'payment_method': {
        'type': 'bank_card',
        'id': '22e12f66-000f-5000-8000-18db351245c7',
        'saved': false,
        'card': {
            'first6': '555555',
            'last4': '4444',
            'expiry_month': '07',
            'expiry_year': '2022',
            'card_type': 'Mir',
            'card_product': {
                'code': 'MCP',
                'name': 'MIR Privilege'
            },
            'issuer_country': 'RU',
            'issuer_name': 'Sberbank'
        },
        'title': 'Bank card *4444'
    },
    'authorization_details': {
        'rrn': '10000000000',
        'auth_code': '000000',
        'three_d_secure': {
            'applied': true
        }
    },
    'recipient': {
        'account_id': '100500',
        'gateway_id': '100700'
    },
    'income_amount': {
        'value': '1.97',
        'currency': 'RUB'
    },
    'metadata': {},
    'created_at': '2018-07-18T10:51:18.139Z',
    'expires_at': '2018-07-25T10:52:00.233Z'
};

export const PAYMENT_PENDING = {
    'id': '22e12f66-000f-5000-8000-18db351245c7',
    'status': 'pending',
    'isPending': true,
    'paid': false,
    'amount': {
        'value': '2.00',
        'currency': 'RUB'
    },
    'confirmation': {
        'type': 'redirect',
        'return_url': 'https://www.example.com/return_url',
        'confirmation_url': 'https://yoomoney.ru/payments/external/confirmation?orderId=22e12f66-000f-5000-8000-18db351245c7'
    },
    'created_at': '2018-07-18T10:51:18.139Z',
    'description': 'Заказ №72',
    'metadata': {},
    'payment_method': {
        'type': 'bank_card',
        'id': '22e12f66-000f-5000-8000-18db351245c7',
        'saved': false
    },
    'recipient': {
        'account_id': '100500',
        'gateway_id': '100700'
    },
    'refundable': false,
    'test': false
};

export const PAYMENT_SUCCEEDED = {
    'id': '22e12f66-000f-5000-8000-18db351245c7',
    'description': 'Заказ №72',
    'amount': {
        'value': '2.00',
        'currency': 'RUB'
    },
    'status': 'succeeded',
    'isSucceeded': true,
    'payment_method': {
        'type': 'bank_card',
        'id': '22e12f66-000f-5000-8000-18db351245c7',
        'saved': false,
        'card': {
            'first6': '555555',
            'last4': '4444',
            'expiry_month': '07',
            'expiry_year': '2022',
            'card_type': 'Mir',
            'card_product': {
                'code': 'MCP',
                'name': 'MIR Privilege'
            },
            'issuer_country': 'RU',
            'issuer_name': 'Sberbank'
        },
        'title': 'Bank card *4444'
    },
    'recipient': {
        'account_id': '100500',
        'gateway_id': '100700'
    },
    'refunded_amount': {
        'value': '0.00',
        'currency': 'RUB'
    },
    'metadata': {},
    'paid': true,
    'refundable': true,
    'test': false,
    'captured_at': '2018-07-18T11:17:33.483Z',
    'created_at': '2018-07-18T10:51:18.139Z'
};

export const PAYMENT_CANCELED = {
    'id': '22e12f66-000f-5000-8000-18db351245c7',
    'status': 'canceled',
    'isCanceled': true,
    'paid': false,
    'amount': {
        'value': '2.00',
        'currency': 'RUB'
    },
    'created_at': '2018-07-18T10:51:18.139Z',
    'description': 'Заказ №72',
    'metadata': {},
    'payment_method': {
        'type': 'bank_card',
        'id': '22e12f66-000f-5000-8000-18db351245c7',
        'saved': false,
        'card': {
            'first6': '555555',
            'last4': '4444',
            'expiry_month': '07',
            'expiry_year': '2022',
            'card_type': 'Mir',
            'card_product': {
                'code': 'MCP',
                'name': 'MIR Privilege'
            },
            'issuer_country': 'RU',
            'issuer_name': 'Sberbank'
        },
        'title': 'Bank card *4444'
    },
    'recipient': {
        'account_id': '100500',
        'gateway_id': '100700'
    },
    'refundable': false,
    'test': false
};