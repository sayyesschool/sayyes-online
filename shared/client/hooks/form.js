import { useState, useEffect } from 'react';

export default function useForm(initialData, deps = []) {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        setData(initialData);
    }, deps);
    
    return [
        data,
        (value, element) => {
            value = (value === undefined) ? element.value : value;
        
            if (element.name.includes('.')) {
                const [name1, name2] = element.name.split('.');
                const obj = data[name1] ?
                    {
                        ...data[name1],
                        [name2]: value
                    }
                    :
                    {
                        [name2]: value
                    };

                setData({
                    ...data,
                    [name1]: obj
                });
            } else {
                setData({
                    ...data,
                    [element.name]: value
                });
            }
        }
    ];
}