import { Level } from '../common/constants';

export const LevelLabels = {
    [Level.Elementary]: 'Elementary',
    [Level.Beginner]: 'Beginner',
    [Level.PreIntermediate]: 'Pre-Intermediate',
    [Level.Intermediate]: 'Intermediate',
    [Level.UpperIntermediate]: 'Upper-Intermediate',
    [Level.Advanced]: 'Advanced'
};

export const MeetingStatus = {
    Scheduled: 'scheduled',
    Started: 'started',
    Ended: 'ended',
    Canceled: 'canceled'
};

export const RegistrationStatus = {
    Pending: 'pending',
    Approved: 'approved',
    Confirmed: 'confirmed',
    Canceled: 'canceled'
};