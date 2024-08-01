export function mapMeeting(meeting, user) {
    const object = meeting.toJSON();
    const registration = meeting.registrations.find(r => r.user == user.id);

    object.host = meeting.host && {
        fullname: meeting.host.fullname,
        avatarUrl: meeting.host.avatarUrl
    };
    object.participants = meeting.participants.length;
    object.registrations = meeting.registrations.length;
    object.isRegistered = registration?.status === 'approved';
    object.isPending = registration?.status === 'pending';
    object.hasParticipated = meeting.participants.includes(user.id);
    object.zoomId = undefined;
    object.startUrl = undefined;
    object.joinUrl = registration?.joinUrl;

    return object;
}