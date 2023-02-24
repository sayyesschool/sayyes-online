import useTrack from 'app/hooks/useTrack';
import VideoTrack from 'app/components/VideoTrack';

export default function Publication({ publication, local, videoOnly, videoPriority }) {
    const track = useTrack(publication);

    if (!track) return null;

    // Even though we only have one case here, let's keep this switch() in case
    // we even need to add a 'data' case for rendering DataTracks.
    switch (track.kind) {
        case 'video':
            return (
                <VideoTrack
                    track={track}
                    priority={videoPriority}
                    local={track.name.includes('camera') && local}
                />
            );
        // All participant audio tracks are rendered in ParticipantAudioTracks.tsx
        default:
            return null;
    }
}