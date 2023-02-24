import { forwardRef } from 'react';

import './index.scss';

function RoomContent({ ...props }, ref) {
    return (
        <div ref={ref} className="room-content" {...props} />
    );
}

export default forwardRef(RoomContent);