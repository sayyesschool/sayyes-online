const payments = {
    succeeded: {
        'id': '2a7f0312-000f-5000-8000-119fe6b958f3',
        'status': 'succeeded',
        'paid': true,
        'amount': {
            'value': '12300.00',
            'currency': 'RUB'
        },
        'captured_at': '2018-07-18T11:17:33.483Z',
        'created_at': '2018-07-18T10:51:18.139Z',
        'description': 'Оплата 10 занятий по 50 минут',
        'payment_method': {
            'type': 'bank_card',
            'id': '22e12f66-000f-5000-8000-18db351245c7',
            'saved': false,
            'card': {
                'first6': '555555',
                'last4': '4444',
                'expiry_month': '07',
                'expiry_year': '2022',
                'card_type': 'MasterCard',
                'issuer_country': 'RU',
                'issuer_name': 'Sberbank'
            },
            'title': 'Bank card *4444'
        },
        'recipient': {
            'account_id': '100500',
            'gateway_id': '100700'
        },
        'refundable': true,
        'refunded_amount': {
            'value': '0.00',
            'currency': 'RUB'
        },
        'test': false,
        'metadata': {
            'packId': '60747afb0929b2f717e14f89',
            'enrollmentId': '615153af94a890291c5bc410',
            'userId': '61514d03fb559543600c506e'
        }
    }
};

const status = process.argv[2] || 'succeeded';

fetch('http://localhost/api/yookassa/payments', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        type: 'notification',
        event: 'payment.succeeded',
        object: payments[status]
    })
});