import { forwardRef, useImperativeHandle } from 'react';

function DividerItemForm(props, ref) {
    useImperativeHandle(ref, () => ({
        get props() { return {}; }
    }));

    return (
        null
    );
}

export default forwardRef(DividerItemForm);