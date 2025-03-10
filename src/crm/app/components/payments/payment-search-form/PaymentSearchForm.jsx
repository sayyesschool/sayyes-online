import { useCallback } from 'react';

import {
    paymentMethodOptions,
    paymentOperatorOptions,
    paymentPurposeOptions,
    paymentStatusOptions
} from 'shared/data/payment';
import { useSearchData } from 'shared/hooks/search';
import datetime from 'shared/libs/datetime';
import { Flex, Form } from 'shared/ui-components';

const getData = ({
    date = '',
    status = '',
    purpose = '',
    method = '',
    operator = ''
} = {}) => ({
    date,
    status,
    purpose,
    method,
    operator
});

export default function PaymentSearchForm({
    data: _data,
    onSubmit,
    ...props
}) {
    const { params, setParam } = useSearchData({
        params: getData(_data),
        onChange: data => {
            if (data.date) {
                data.date = datetime(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
            }

            return onSubmit(data);
        }
    });

    const handleChange = useCallback(event => {
        const { name, value } = event.target;

        setParam({ name, value });
    }, [setParam]);

    return (
        <Form
            className="PaymentSearchForm"
            {...props}
        >
            <Flex gap="smaller">
                <Form.Input
                    label="Дата"
                    type="date"
                    name="date"
                    value={params.date ? datetime(params.date).format('YYYY-MM-DD') : ''}
                    orientation="horizontal"
                    onChange={handleChange}
                />

                <Form.Select
                    label="Статус"
                    name="status"
                    value={params.status}
                    options={paymentStatusOptions}
                    orientation="horizontal"
                    onChange={handleChange}
                />

                <Form.Select
                    label="Цель"
                    name="purpose"
                    value={params.purpose}
                    options={paymentPurposeOptions}
                    orientation="horizontal"
                    onChange={handleChange}
                />

                <Form.Select
                    label="Способ оплаты"
                    name="method"
                    value={params.method}
                    options={paymentMethodOptions}
                    orientation="horizontal"
                    onChange={handleChange}
                />

                <Form.Select
                    label="Оператор"
                    name="operator"
                    value={params.operator}
                    options={paymentOperatorOptions}
                    orientation="horizontal"
                    onChange={handleChange}
                />
            </Flex>
        </Form>
    );
}