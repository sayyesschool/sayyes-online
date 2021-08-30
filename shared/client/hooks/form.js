import { useState, useEffect } from 'react';

export default function useForm(initialData, deps = []) {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        setData(initialData);
    }, deps);

    return [
        data,
        ({ target }, value) => {
            value = (value === undefined) ? target.value : value;

            if (target.name.includes('.')) {
                setData(data => {
                    const [name1, name2] = target.name.split('.');
                    const obj = typeof data[name1] === 'object' ?
                        {
                            ...data[name1],
                            [name2]: value
                        }
                        :
                        {
                            [name2]: value
                        };

                    return {
                        ...data,
                        [name1]: obj
                    };
                });
            } else {
                setData(data => ({
                    ...data,
                    [target.name]: value
                }));
            }
        },
        setData
    ];
}