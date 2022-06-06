import { Divider } from '@fluentui/react-northstar';

export default function ExerciseDividerItem({ item }) {
    return (
        <Divider
            content={item.text}
        />
    );
}