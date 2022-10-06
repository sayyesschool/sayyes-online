import { NavLink } from 'react-router-dom';

import Avatar from 'shared/ui-components/avatar';
import Icon from 'shared/ui-components/icon';
import List from 'shared/ui-components/list';

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