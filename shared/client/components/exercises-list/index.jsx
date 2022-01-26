import { NavLink } from 'react-router-dom';
import {
    Avatar,
    List
} from 'mdc-react';

import './index.scss';

export default function ExercisesList({ exercises }) {
    return (
        <List className="exercises-list">
            {exercises.map((exercise, index) =>
                <List.Item
                    key={exercise.id}
                    component={NavLink}
                    to={exercise.uri}
                    activeClassName="mdc-list-item--activated"
                    avatar={
                        <Avatar key={exercise.id} text={index + 1} size="medium" />
                    }
                    overlineText={exercise.title}
                    primaryText={exercise.description}
                />
            )}
        </List>
    );
}