import TextContent from 'shared/components/text-content';

export default function ExerciseDirectionsItem({ item }) {
    return (
        <TextContent
            text={item.text}
        />
    );
}