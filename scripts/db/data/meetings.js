import { Types } from 'mongoose';

import datetime from 'shared/libs/datetime';

import { teacher } from './users';

export const onlineMeeting = {
    _id: new Types.ObjectId().toHexString(),
    title: 'Online Meeting',
    description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
    status: 'scheduled',
    startDate: datetime().add(1, 'day').toDate(),
    duration: 60,
    level: 0,
    capacity: 10,
    published: true,
    online: true,
    image: {
        src: 'https://picsum.photos/400'
    },
    materialsUrl: 'https://zoom.us/materials',
    notes: 'Meeting notes',
    hostId: teacher._id
};

export const offlineMeeting = {
    _id: new Types.ObjectId().toHexString(),
    title: 'Offline Meeting',
    description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
    status: 'scheduled',
    startDate: datetime().add(2, 'day').toDate(),
    duration: 60,
    level: 1,
    capacity: 10,
    published: true,
    online: false,
    image: {
        src: 'https://picsum.photos/400'
    },
    materialsUrl: 'https://zoom.us/materials',
    notes: 'Meeting notes',
    hostId: teacher._id
};

export const freeMeeting = {
    _id: new Types.ObjectId().toHexString(),
    title: 'Free Meeting',
    description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
    status: 'scheduled',
    startDate: datetime().add(3, 'day').toDate(),
    duration: 60,
    level: 1,
    capacity: 10,
    free: true,
    published: true,
    online: true,
    image: {
        src: 'https://picsum.photos/400'
    },
    materialsUrl: 'https://zoom.us/materials',
    notes: 'Meeting notes',
    hostId: teacher._id
};

export const startedMeeting = {
    _id: new Types.ObjectId().toHexString(),
    title: 'Started Meeting',
    description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
    status: 'started',
    startDate: datetime().subtract(1, 'hour').toDate(),
    duration: 60,
    level: 1,
    capacity: 10,
    published: true,
    online: false,
    image: {
        src: 'https://picsum.photos/400'
    },
    materialsUrl: 'https://zoom.us/materials',
    notes: 'Meeting notes',
    hostId: teacher._id
};

export const pastMeeting = {
    _id: new Types.ObjectId().toHexString(),
    title: 'Past Meeting',
    description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
    status: 'ended',
    startDate: datetime().subtract(1, 'day').toDate(),
    duration: 60,
    level: 1,
    capacity: 10,
    published: true,
    online: false,
    image: {
        src: 'https://picsum.photos/400'
    },
    materialsUrl: 'https://zoom.us/materials',
    notes: 'Meeting notes',
    hostId: teacher._id
};

export const canceledMeeting = {
    _id: new Types.ObjectId().toHexString(),
    title: 'Canceled Meeting',
    description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
    status: 'canceled',
    startDate: datetime().add(5, 'day').toDate(),
    duration: 60,
    level: 1,
    capacity: 10,
    published: true,
    online: false,
    image: {
        src: 'https://picsum.photos/400'
    },
    materialsUrl: 'https://zoom.us/materials',
    notes: 'Meeting notes',
    hostId: teacher._id
};

export default [
    onlineMeeting,
    offlineMeeting,
    freeMeeting,
    startedMeeting,
    pastMeeting,
    canceledMeeting
];