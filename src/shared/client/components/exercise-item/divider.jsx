import Divider from 'shared/ui-components/divider';

export default function ExerciseDividerItem({ item }) {
    return (
        <Divider
            content={item.text}
        />
    );
}