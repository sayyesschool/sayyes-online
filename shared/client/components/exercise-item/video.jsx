import VideoContent from 'shared/components/video-content';

export default function ExerciseVideoItem({ item }) {
    return item.video ? (
        <VideoContent
            video={item.video}
        />
    ) : null;
}