import { NavLink } from 'react-router-dom';
import {
    Menu
} from '@fluentui/react-northstar';

export default function ExercisesMenu({ exercises }) {
    return (
        <Menu
            className="exercises-menu"
            items={exercises.map(exercise => ({
                key: exercise.id,
                as: NavLink,
                to: exercise.uri,
                content: exercise.title,
                active: true
            }))}
            vertical
        />
    );
}