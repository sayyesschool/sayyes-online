import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

const ErrorMessages = {
    REQUIRED: 'Поле обязательно для заполнения'
};

const defaultMeta = {
    touched: false,
    submitting: false,
    valid: true
};

function isObject(value) {
    return value !== null && typeof value === 'object';
}

export default useFormData;

export function useForm({ values, fields = values, onSubmit } = {}, deps = []) {
    const [data, setData] = useState(() => toData(fields));
    const [meta, setMeta] = useState(defaultMeta);

    useEffect(() => {
        setData(toData(fields));
        setMeta(defaultMeta);
    }, deps);

    const handleChange = useCallback(({ target } = {}) => {
        const { name, value } = target;

        setMeta(meta => ({ ...meta, touched: true }));

        setData(data => {
            if (isArrayField(data, name)) {
                return updateArrayField(data, name, value);
            } else if (isObjectField(data, name)) {
                return updateObjectField(data, name, value);
            } else {
                return updatePrimitiveField(data, name, value);
            }
        });
    }, deps);

    const handleSubmit = useCallback(event => {
        event.preventDefault();
        event.stopPropagation();

        setData(data => {
            const [valid, validatedData] = validate(data);

            if (valid) {
                setMeta(meta => ({
                    ...meta,
                    valid,
                    submitting: true
                }));

                onSubmit(dataToValues(validatedData));
            } else {
                setMeta(meta => ({
                    ...meta,
                    valid: false
                }));
            }

            return validatedData;
        });

        return false;
    }, [onSubmit]);

    const setValues = useCallback(values => {
        setData(data => {
            const newData = Object.entries(typeof values === 'function' ? values(dataToValues(data)) : values).reduce((result, [key, value]) => {
                result[key] = {
                    ...data[key],
                    value
                };

                return result;
            }, {});

            return {
                ...data,
                ...newData
            };
        });
    }, []);

    return {
        data,
        meta,
        setValues,
        handleChange,
        handleSubmit
    };
}

export function useFormData(initialData, deps = []) {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        setData(initialData);
    }, deps);

    const handleChange = useCallback(({ target } = {}) => {
        const { name, value, checked } = target;

        setData(data => {
            const [name1, name2] = name.split('.');

            if (Array.isArray(data[name1]) && !isNaN(name2)) {
                const array = data[name1].slice();

                array[name2] = value;

                return {
                    ...data,
                    [name1]: array
                };
            } else if (!Array.isArray(data[name1]) && isObject(data[name1])) {
                return {
                    ...data,
                    [name1]: {
                        ...data[name1],
                        [name2]: value
                    }
                };
            } else {
                return {
                    ...data,
                    [name1]: typeof data[name1] === 'boolean' ? checked : value
                };
            }
        });
    }, deps);

    const getData = useCallback(fn => {
        setData(data => {
            fn(data);
            return data;
        });
    });

    return {
        data,
        setData,
        getData,
        handleChange
    };
}

function toData(arg) {
    if (Array.isArray(arg)) {
        return fieldsToData(arg);
    } else if (typeof arg === 'object') {
        return valuesToData(arg);
    } else {
        throw new Error('Invalid data');
    }
}

function fieldsToData(fields) {
    return fields.reduce((data, field) => {
        data[field.name] = field;
        return data;
    }, {});
}

function valuesToData(values) {
    return Object.entries(values).reduce((data, [_name, field]) => {
        const name = _name.replace('*', '');
        const required = _name.includes('*');

        data[name] = {
            name,
            value: field,
            required
        };

        return data;
    }, {});
}

function dataToValues(data) {
    return Object.entries(data).reduce((result, [key, field]) => {
        result[key] = field.value;
        return result;
    }, {});
}

function validate(data) {
    let valid = true;
    let validatedData = {};

    for (const [key, field] of Object.entries(data)) {
        if (field.required && !field.value) {
            valid = false;
            validatedData[key] = {
                ...field,
                error: true,
                errorMessage: ErrorMessages.REQUIRED
            };
        } else {
            validatedData[key] = {
                ...field,
                error: undefined,
                errorMessage: undefined
            };
        }
    }

    return [valid, validatedData];
}

function isArrayField(data, name) {
    const [key, index] = name.split('.');
    const value = data[key].value;

    return Array.isArray(value) && !isNaN(index);
}

function isObjectField(data, name) {
    const [key] = name.split('.');
    const value = data[key]?.value;

    return typeof value === 'object' && value !== null;
}

function updateArrayField(data, name, value) {
    const [key, index] = name.split('.');
    const field = data[name];
    const array = field.value.slice();

    array[index] = value;

    return {
        ...data,
        [key]: {
            ...field,
            value: array
        }
    };
}

function updateObjectField(data, name, value) {
    const [key1, key2] = name.split('.');
    const field = data[key1];
    const object = field.value;

    object[key2] = value;

    return {
        ...data,
        [key1]: {
            ...field,
            value: object
        }
    };
}

function updatePrimitiveField(data, name, value) {
    const field = data[name];

    return {
        ...data,
        [name]: {
            ...field,
            value,
            error: undefined,
            errorMessage: undefined
        }
    };
}