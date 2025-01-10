import datetime from 'shared/libs/datetime';

import { teacher } from './users';

export default [
    {
        title: 'Online Meeting',
        description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
        status: 'scheduled',
        date: datetime().add(1, 'day').toDate(),
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
    },
    {
        title: 'Offline Meeting',
        description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
        status: 'scheduled',
        date: datetime().add(2, 'day').toDate(),
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
    },
    {
        title: 'Free Meeting',
        description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
        status: 'scheduled',
        date: datetime().add(3, 'day').toDate(),
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
    },
    {
        title: 'Started Meeting',
        description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
        status: 'started',
        date: datetime().subtract(1, 'hour').toDate(),
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
    },
    {
        title: 'Past Meeting',
        description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
        status: 'ended',
        date: datetime().subtract(1, 'day').toDate(),
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
    },
    {
        title: 'Canceled Meeting',
        description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
        status: 'canceled',
        date: datetime().add(5, 'day').toDate(),
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
    }
];