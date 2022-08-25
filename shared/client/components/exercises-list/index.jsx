import { NavLink } from 'react-router-dom';
import {
    Avatar,
    List
} from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';

import './index.scss';

export default function ExercisesList({ exercises }) {
    return (
        <List className="exercises-list">
            {exercises.map((exercise, index) =>
                <List.Item
                    key={exercise.id}
                    as={NavLink}
                    to={exercise.uri}
                    avatar={
                        <Avatar key={exercise.id} text={index + 1} size="medium" />
                    }
                    media={
                        <Icon>{exercise.completed ? 'check_circle_outline' : 'radio_button_unchecked'}</Icon>
                    }
                    header={exercise.title}
                    content={exercise.description}
                    navigable
                    selectable
                />
            )}
        </List>
    );
}