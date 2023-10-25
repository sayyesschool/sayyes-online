import TextContent from 'shared/components/text-content';

export default function ExerciseTextItem({ item }) {
    return (
        <TextContent
            content={item.text}
        />
    );
}