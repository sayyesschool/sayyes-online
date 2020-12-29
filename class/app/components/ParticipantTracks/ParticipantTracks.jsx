import React from 'react';

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
    videoOnly,
    enableScreenShare,
    videoPriority,
    isLocalParticipant,
}) {
    const publications = usePublications(participant);

    let filteredPublications;

    if (enableScreenShare && publications.some(p => p.trackName.includes('screen'))) {
        filteredPublications = publications.filter(p => !p.trackName.includes('camera'));
    } else {
        filteredPublications = publications.filter(p => !p.trackName.includes('screen'));
    }

    console.log(publications, filteredPublications);

    return (
        <>
            {filteredPublications.map(publication => (
                <Publication
                    key={publication.kind}
                    publication={publication}
                    participant={participant}
                    isLocalParticipant={isLocalParticipant}
                    videoOnly={videoOnly}
                    videoPriority={videoPriority}
                />
            ))}
        </>
    );
}