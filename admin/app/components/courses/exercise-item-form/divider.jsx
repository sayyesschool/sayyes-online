import { forwardRef, useImperativeHandle } from 'react';

function ExerciseDividerItem({ item }, ref) {
    useImperativeHandle(ref, () => ({
        get data() { return {}; }
    }));

    return (
        null
    );
}

export default forwardRef(ExerciseDividerItem);