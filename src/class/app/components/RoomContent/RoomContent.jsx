import { forwardRef } from 'react';

function RoomContent({ ...props }, ref) {
    return (
        <main ref={ref} className="RoomContent" {...props} />
    );
}

export default forwardRef(RoomContent);