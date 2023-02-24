import AudioContent from 'shared/components/audio-content';

export default function ExerciseAudioItem({ item }) {
    return (
        <AudioContent
            audio={item.audio}
        />
    );
}