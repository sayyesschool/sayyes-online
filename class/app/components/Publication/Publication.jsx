import useTrack from 'app/hooks/useTrack';
import AudioTrack from 'app/components/AudioTrack';
import VideoTrack from 'app/components/VideoTrack';

export default function Publication({ publication, local, videoOnly, videoPriority }) {
    const track = useTrack(publication);

    if (!track) return null;

    switch (track.kind) {
        case 'video':
            return (
                <VideoTrack
                    track={track}
                    priority={videoPriority}
                    local={track.name.includes('camera') && local}
                />
            );
        case 'audio':
            return videoOnly ? null : <AudioTrack track={track} />;
        default:
            return null;
    }
}