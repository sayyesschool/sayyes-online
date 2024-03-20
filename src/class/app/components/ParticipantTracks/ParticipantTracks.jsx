import usePublications from 'app/hooks/usePublications';
import Publication from 'app/components/Publication';

/*
 *  The object model for the Room object (found here: https://www.twilio.com/docs/video/migrating-1x-2x#object-model) shows
 *  that Participant objects have TrackPublications, and TrackPublication objects have Tracks.
 *
 *  The React components in this application follow the same pattern. This ParticipantTracks component renders Publications,
 *  and the Publication component renders Tracks.
 */

export default function ParticipantTracks({
    participant,
    local,
    screenShareEnabled,
    videoOnly,
    videoPriority
}) {
    const publications = usePublications(participant);

    const filteredPublications =
        (screenShareEnabled && publications.some(p => p.trackName.includes('screen'))) ?
            publications.filter(p => !p.trackName.includes('camera')) :
            publications.filter(p => !p.trackName.includes('screen'));

    return filteredPublications.map(publication => (
        <Publication
            key={publication.trackSid}
            publication={publication}
            participant={participant}
            local={local}
            videoOnly={videoOnly}
            videoPriority={videoPriority}
        />
    ));
}