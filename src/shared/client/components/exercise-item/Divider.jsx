import { Divider } from 'shared/ui-components';

export default function ExerciseDividerItem({ item }) {
    return (
        <Divider
            content={item.text}
        />
    );
}