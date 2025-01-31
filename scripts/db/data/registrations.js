import { onlineMeeting } from './meetings';
import { membership4 } from './memberships';
import { learner } from './users';

export default [
    {
        status: 'approved',
        userId: learner._id,
        meetingId: onlineMeeting._id,
        membershipId: membership4._id
    }
];