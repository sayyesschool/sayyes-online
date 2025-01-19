import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';

import UserSearch from 'shared/components/user-search';
import { useFormData } from 'shared/hooks/form';
import datetime from 'shared/libs/datetime';
import { Form } from 'shared/ui-components';

export default forwardRef(MembershipForm);

const getData = ({
    limit = 1,
    price = 0,
    startDate = new Date(),
    endDate = datetime(new Date()).add(1, 'day').toDate(),
    userId = ''
} = {}) => ({
    limit,
    price,
    startDate: datetime(startDate).format('YYYY-MM-DD'),
    endDate: datetime(endDate).format('YYYY-MM-DD'),
    userId
});

function MembershipForm({ membership, onSubmit, ...props }, ref) {
    const formRef = useRef();

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    const { data, handleChange } = useFormData(getData(membership), [membership?.id]);
    const [userId, setUserId] = useState(data.userId);

    const handleSubmit = useCallback(() => {
        if (!userId) return;

        onSubmit({ ...data, userId });
    }, [userId, data, onSubmit]);

    const handleSearchResult = useCallback(userId => {
        setUserId(userId);
    }, []);

    return (
        <Form
            ref={formRef}
            id="membership-form"
            onSubmit={handleSubmit}
            {...props}
        >
            {!data.userId &&
                <UserSearch
                    label="Пользователь"
                    onResult={handleSearchResult}
                />
            }

            <Form.Input
                type="number"
                name="limit"
                value={data.limit}
                label="Лимит посещений"
                min={1}
                required
                onChange={handleChange}
            />

            <Form.Input
                type="number"
                name="price"
                value={data.price}
                label="Сумма"
                end="руб."
                min={0}
                onChange={handleChange}
            />

            <Form.Input
                type="date"
                name="startDate"
                value={data.startDate}
                label="Дата начала"
                onChange={handleChange}
            />

            <Form.Input
                type="date"
                name="endDate"
                value={data.endDate}
                label="Дата окончания"
                onChange={handleChange}
            />
        </Form>
    );
}